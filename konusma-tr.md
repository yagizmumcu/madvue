# MadVue 2026 Recap — Konuşma metni

Sunum sırasında arkada okuyabileceğin akıcı bir anlatım. Her slayt için 2–4 cümle, normal tempoda 30–45 saniye sürer. Toplam yaklaşık 30 dakika.

Kod parçaları, API adları ve teknik terimler İngilizce bırakıldı — slaytlardaki kelimelerle aynı kalıyor.

---

## Slayt 1 — Kapak: MadVue 2026 Recap

Selam, geçen hafta Madrid'deydim, MadVue 2026 konferansındaydım. Bugün orada gördüğüm en faydalı konuşmaları sizinle hızlıca paylaşacağım, takım için ne çıkıyor ona bakacağız. Bazı konuşmaların kayıt linkleri var, bazılarında elimde sadece fotoğraf ve notlar var — ona göre bazı yerlerde daha çok duracağız.

---

## Slayt 2 — Bugünün gündemi

Altı konuşma var. Eduardo'nun Type-Safe URLs'i ile başlıyoruz, sonra JS toolchain'ine geçiyoruz, ardından AI destekli adaptive UI'lar, AI'a hazırlık için Clean Code, form component'lerinin yeni modeli ve en sonda real-time uygulamalar. Her konuşmanın sonunda kısa bir "biz neredeyiz" slaytı var — orada konuşulanları search-ads-ui ve action-kit'e bağlayacağız.

---

## Slayt 3 — Type-Safe URLs (bölüm açılışı)

İlk konuşmacımız Eduardo San Martin Morote, Vue Router'ın maintainer'ı. Konu basit ama derin: URL'i bir state olarak ele alıyor ve Vue Router 5'in getirdiği param parser sistemini anlatıyor.

---

## Slayt 4 — Type-Safe URLs (giriş)

Eduardo'nun bakış açısı şu: URL aslında diğer state container'larının yapamadığı üç şeyi yapabilen birinci sınıf bir state aslında. Bunlar şöyle: **teleport** — linki paylaşıyorsun, karşı taraf aynı state'e iniyor. **Zamanda yolculuk** — browser'ın geri/ileri butonları bedava undo/redo gibi çalışıyor. Ve **sunucu ile istemci arasında iletişim** — redirect, auth flow, SSR hydration, hepsi URL üzerinden.

Ama bir sıkıntı var: URL bir string. Bu yüzden bugün her sayfa aynı `Number()`, `NaN` kontrolü, `JSON.parse` dansını tekrar tekrar yapıyor. Vue Router 5'in cevabı bu işi router'a taşımak — sayfalar artık tip güvenli prop alıyor. Önemli haber: `unplugin-vue-router` artık core'a merge edildi.

---

## Slayt 5 — Type-Safe URLs (ana hatlar)

Burada konuşmadan çıkan dört ana fikri, her birini bir kod örneğiyle koydum. Birincisi: aktive etmek tek bir flag — `experimental: { paramParsers: true }`. İkincisi: dosya adı parser'ı seçiyor, `[id=int].vue` yazdığında param doğrudan number geliyor. Üçüncüsü: kendi parser'ın iki fonksiyondan ibaret, `get` ve `set`. Dördüncüsü: path ve query farklı davranıyor — path parse fail olursa **404**, query parse fail olursa **default değere** düşüyor ama route eşleşmeye devam ediyor.

---

## Slayt 6 — Type-Safe URLs (bugünkü dert)

Eduardo bu slaytta bugünkü acıyı somutlaştırdı. Path param `string | string[]` tipinde geliyor, bu yüzden elle `Number()` çevirip `Number.isNaN` kontrolü yapmak zorundasın. Query param daha kötü: `string | null | (string | null)[]`. Bunu güvenli okumak için iç içe ternary yazmak zorunda kalıyorsun. En kötüsü de validation'ın template'e sızması — `<template v-if="typeof id === 'number'">` ile sarmadan kullanamıyorsun. Bu üç slayt arka arkaya gösterildiğinde salonda herkes başını sallıyor.

---

## Slayt 7 — Type-Safe URLs (dört adımda nasıl benimsenir)

Adoption şu dört adımda oluyor. Birinci adım: `vite.config.ts`'te `vueRouter` plugin'ine `experimental: { paramParsers: true }` ekliyorsun. İkinci adım: router'ı `vue-router/experimental`'dan `experimental_createRouter` ile oluşturuyorsun, resolver'ı `vue-router/auto-resolver`'dan alıyorsun. Üçüncü adım: sayfayı `[id=int].vue` diye isimlendiriyorsun, `int` ve `bool` built-in olarak geliyor. Dördüncü adım: özel bir tip lazımsa `src/params/` altına bir dosya atıyorsun, `defineParamParser({ get, set })` ile yazıyorsun, parse başarısız olduğunda `miss()` çağırıyorsun. Hepsi bu kadar.

---

## Slayt 8 — Type-Safe URLs (biz neredeyiz)

Şimdi kendi kodumuza bakalım. Search-ads-ui'da `/src-new` altında otuz bir modül var, hepsi Vue Router 4.6 kullanıyor. `defineRoute` veya `definePage` kullanan tek bir yer bile yok. En kötü örnekler şunlar:

- `change-history`'nin server-side datasource composable'ında `Array.isArray(route.query.entities)` dansı var, aynısı `actions` ve `agents` için de tekrarlanıyor.
- `benchmarks` store'unda `route.query.startDate as string` doğrudan API'ye gönderiliyor — hiçbir doğrulama yok.
- Eski tarafta `SmartBiddingFiltersStore.ts` yedi taneden fazla CSV-to-number parser barındırıyor.

URL'den store'a giden akış tek yönlü: store query'den okuyor ama state değişince `router.replace` ile URL geri güncellenmiyor. Action-kit için bu konu geçerli değil — kendi route'u yok, sadece `breadcrumb` runtime'da `RouterLink`'i çözüyor.

Bir sonraki adım olarak en ucuz kazanç `benchmarks` store'u — sadece iki alan var, array yok. Zod codec ile sararız. Vue Router 5'in `paramParsers`'ı stabil olunca da izole bir modülde deneriz.

---

## Slayt 9 — Oxc, Rolldown, Vitest, Vite (bölüm açılışı)

İkinci konuşma VoidZero'dan Élise Patrikainen'in. Konu Evan You'nun startup'ı VoidZero'nun inşa ettiği, Rust üzerine kurulu bütünleşik bir toolchain.

---

## Slayt 10 — JS toolchain'inin geleceği (giriş)

Slaytta hız rakamları var, özet şu: Oxc parser SWC'den üç kat, transform dört kat, resolver yirmi sekiz kat hızlı. Oxlint ESLint'ten elli ila yüz kat, Rolldown Rollup'tan on ila otuz kat hızlı. Ana mesaj şu: tek bir Rust core ile dev, lint, test ve prod'u besleyebilirsin.

---

## Slayt 11 — Toolchain (ana hatlar)

Bizim için iki somut deneme çıkıyor. Birincisi `rolldown-vite` — en büyük uygulamamızda drop-in olarak denenebilir. İkincisi `oxlint`'i ESLint'in yanında pre-filter olarak çalıştırıp CI süresini ölçmek. Vitest'in Rolldown pipeline'ına geçişi de yolda. Plugin uyumluluğunu da takip etmek lazım.

---

## Slayt 12 — Toolchain (biz neredeyiz)

İki repo da Vite ve ESLint 9 antfu config kullanıyor. Search-ads-ui'da ilginç bir detay var: `eslint.config.ts` içindeki `scopeToSrcNew()` helper'ı strict kuralları sadece `/src-new` altında uyguluyor — eski `/src` kendi haline bırakılmış. Test sayısı arasındaki fark çarpıcı: yeni tarafta yirmi altı test, eski tarafta sadece bir. `.husky/_/` klasörü mevcut ama içi boş, hiç hook scripti yok — yani ESLint sadece CI'da çalışıyor. Ağır bağımlılıklar `ag-grid-enterprise`, `ant-design-vue` ve action-kit. Vite plugin'leri de VitePWA, Sentry, compression ve vue-devtools.

Action-kit ise bir library olarak çok daha test-yoğun: yüz otuz test dosyası. Vite 7.3, ESLint 9, Vitest 3.2 kullanıyor. Plugin tarafında `vue()`, `svgLoader`, `dts` ve özel bir `buildCSSPlugin` var. Çıktı tek bir ESM bundle, treeshakeable, bağımlılıklar dışarıda. Styling tarafında üçlü bir karışım var: Tailwind, SCSS ve Less component bazında bir arada — net bir migration planı yok.

Bir sonraki adım: iki repoda da Oxlint'i CI pre-filter olarak ekleyelim, ESLint kaynak-doğru olmaya devam etsin. Search-ads-ui'da hazır duran `.husky/` klasörüne çalışan bir hook scripti koyalım. Action-kit'te de tek bir styling sistemine karar verip migration planı yazalım.

---

## Slayt 13 — Adaptive UIs with Vue and AI (bölüm açılışı)

Üçüncü konuşma Markus Oberlehner'dan. LLM stream ettikçe büyüyen JSON'a göre canlı render olan adaptive UI'lar üzerine.

---

## Slayt 14 — Adaptive UIs (giriş)

Markus'un getirdiği kavramlar şöyle: agent dediğin aslında bir döngü — model, tool'lar ve context window'dan oluşuyor. Model runtime'ı görmez, sadece description'ları görür. Asıl ilginç kısım şurada: LLM hâlâ JSON'u stream ederken sen UI'ı render etmeye başlıyorsun. Bizim için kapı aralayan fikir bu.

---

## Slayt 15 — Adaptive UIs (ana hatlar)

İki teknik detay öne çıkıyor. Birincisi: `dataSources` field'ı arrow-return string'lerle data fetch'i tarif ediyor, UI ağacı daha gelmeden fetch başlıyor. `expr>` syntax'ıyla LLM inline expression gömebiliyor. İkincisi: tüm prop'lar `MaybeLazy<T>` tipinde, yani değer, fonksiyon veya promise olabiliyor — aynı component'i son haliyle de, fonksiyonla da, stream eden promise ile de render edebiliyorsun. Eksik JSON'u `jsonrepair` ile sağlamlaştırıyor.

---

## Slayt 16 — Adaptive UIs (kod örnekleri)

Burada gerçek kod var. Sol tarafta JSON LLM stream ederken nasıl büyüyor görüyorsunuz. Sağda Vue tarafı: `MaybeLazy<T>` prop'lar ve `BaseAwait` component'iyle skeleton gösteriyorsun. `expr>` ile LLM inline expression yazıp dataSources üzerine closure kurabiliyor. Bu setup'ın işe yaramasının nedeni şu: UI partial JSON ile bile anlamlı şekilde render olabiliyor.

---

## Slayt 17 — Adaptive UIs (biz neredeyiz)

Burada güzel bir hikaye çıkıyor: iki repo zaten birbirine bağlanmış durumda. Search-ads-ui'daki `ai-assistant` modülü action-kit'in `MaChatbot` component'ini siyah kutu olarak render ediyor. `ai-assistant-modal.store.ts` modal state'ini tutuyor, `ai-assistant-ask-ai-modal-chatbot.vue` `MaChatbot`'u sarıyor, `busy` ve `response-finished` event'lerini emit ediyor, `maOrgId` değiştiğinde reset oluyor.

Action-kit tarafına bakınca işin altyapısı görünüyor. `components/chatbot/plugin.ts`'te `fetchEventSource` Bedrock'a bağlanıyor, sekiz farklı tipte event geliyor: `agent_response`, `agent_reasoning`, `error`, `guardrail_violation`, `model_id`, `usage`, `request_time`, `message_id`, en sonda da `[DONE]`. Üstüne `AbortController`, 401/403 auth hook'ları, `[TIMEOUT]` prefix'li hatalar ve stream sırasında markdown sanitization var. Yani altyapı tamam.

Bir sonraki adım olarak `plugin.ts`'ten generic bir `useFetchEventSource()` composable'ı çıkarmak istiyorum. Markus'un JSON tree stream için kullanacağı şekilde aynısı. İlerde adaptive layout gerekirse alt katman zaten elimizde olur.

---

## Slayt 18 — Clean Code Is Sexy Again (bölüm açılışı)

Dördüncü konuşma Alexander Opalic'ten. Başlık biraz yanıltıcı: aslında AI hakkında değil, AI'ı işe yarar kılan proje hijyeni hakkında.

---

## Slayt 19 — Clean Code Is Sexy Again (giriş)

Alexander şöyle açıyor: Bun'ın bir kısmı agent yardımıyla Rust'a yeniden yazıldı. "Artık kod yazmaya gerek yok" cümlesi yarı doğru — **eğer** proje AI'a hazırsa ve geliştiriciler ne yaptığını biliyorsa. Düşünme modeli şöyle: agent dediğin bir döngü, model, tool'lar ve context'ten ibaret. Context window dolu olmadığında çok daha iyi çalışıyor. Slaytları ve repo'su açık, kendi internal pipeline'larımız için harika bir referans.

---

## Slayt 20 — Clean Code (ana hatlar)

İki taraflı bir yaklaşım var. Somut setup parçaları olarak: `AGENTS.md` bir "doorway" olarak tutuluyor, içine her şeyi tıkmak yerine ana yerlere yönlendiriyor. `brain/` klasöründe Codebase, Plans ve Principles var. Skills, hooks ve katmanlı bir kalite pipeline'ı: types → lint → unit → component → agent-browser. Lefthook commit-time gate görevi görüyor. Bizde deneyebileceklerimiz: `AGENTS.md` başlatmak, üç-beş prensip seçmek ("Boundary Discipline" gibi), bir uygulamaya agent-browser eklemek. Ana mesaj akılda kalsın: "Fabrikayı düzelt, PR'ı değil" — agent yanılıyorsa hata genellikle PR'da değil, kural setinde, context'te veya pipeline'da.

---

## Slayt 21 — Clean Code (kod örnekleri)

Alexander'ın üç kod parçası şöyle. Birincisi: tool dediğin aslında bir fonksiyon — üç field var, hepsi bu. İkincisi: agent loop bir recursion — model'i çağırıyorsun, tool'ları çalıştırıyorsun, sonuç döndüyse loop devam ediyor. Üçüncüsü: `SessionStart` hook'u `brain/index.md`'i context'e enjekte ediyor — altı satır shell. Setup'ı işler kılan asıl sır bu son parça.

---

## Slayt 22 — Clean Code (biz neredeyiz)

Burada ilginç bir asimetri var. Search-ads-ui'da dört yüz on dört satırlık bir `AGENTS.md` var — modül yapısı zorunlu, vee-validate ve Zod pattern'ları, import alias'ları (`@ma/`, `@/`), iki yüz satırlık component limiti hepsi orada yazılı. `/src-new` altında otuz bir feature-scoped modül var, sadece üç tane global Pinia store: `top-progress-bar`, `layout-element-size`, `route-leave-confirm`. Composable'lar `readonly()` ile expose ediyor, yani encapsulation gerçekten saygı görüyor. Ama `.husky/_/` klasörü boş, `lint-staged` yok — ESLint sadece CI'da koşuyor.

Action-kit'te ise tam tersi var: `simple-git-hooks` aktif, pre-commit'te `lint-staged` üzerinden `eslint --fix` çalışıyor. Yetmiş iki component klasörü, yüz otuz test dosyası, tek bir ESM bundle. Composable'lar çoğunlukla component'in içine gömülü — `/chatbot/composables/`, `/cascader/composables/` gibi. Üstte sadece `composables/ssr.ts` var. `AGENTS.md` yok, `skills/` klasörü integration dökümanları için kullanılıyor.

Bir sonraki adım çapraz fayda: search-ads-ui'daki hazır duran `.husky/` klasörüne çalışan bir hook scripti koyalım. Action-kit için ise elli satırlık bir "doorway" `AGENTS.md` yazalım — dört yüz on dört satırlık olanı kopyalamayalım, sadece mevcut storybook ve skills'e işaret eden bir giriş yeterli.

---

## Slayt 23 — A New Model for Form Components (bölüm açılışı)

Beşinci konuşma vee-validate'in yazarı Abdelrahman Awad'dan. Şu anda Sentry'de Senior Engineer olarak çalışıyor. Konu form component'lerinin yeniden tasarlanması.

---

## Slayt 24 — A New Model for Form Components (giriş)

Awad'ın tezi şu: mevcut her form yaklaşımı bir şeyi geride bırakıyor. Pure validator'lar schema'yı çözüyor ama markup, accessibility ve i18n sende kalıyor. UI kit'ler güzel görünüyor ama davranış kilitli, customize ederken kütüphane ile savaşıyorsun. Schema builder'lar DSL'i terk ettiğin anda dünyayı yeniden inşa ediyorsun. "Headless" denilen kütüphaneler bile markup varsayımlarını sızdırıyor — yani gerçekten headless değiller. Onun cevabı şu: tek bir `useField(props)` beyni — davranış, state, i18n ve accessibility'yi bir arada yönetiyor, sana spread edeceğin prop bundle'ları veriyor, markup'ı sen yazıyorsun.

---

## Slayt 25 — Form Components (ana hatlar)

Dört ana çıkarım var. Birincisi: `useField(props)` dört konuyu birden yönetiyor — davranış (klavye, focus, pointer), state (value, touched, dirty, errors), i18n (RTL, locale numbers, calendars) ve accessibility (ARIA prop'lara otomatik gömülü geliyor). İkincisi: `controlProps`, `labelProps`, `errorProps` bundle'larını sen kendi template'ine spread ediyorsun — kütüphane sana wrapper element dayatmıyor. Üçüncüsü: model en alta kadar composable — `useNumberField` aslında `useSpinButton + useNumberParser + useInputValidity + useLocale`'in birleşimi. Dördüncüsü ve en güzeli: **form transactions** — bir alan kaybolduğunda form sebebini sormuyor, her değişikliği queued ve dedupe edilmiş typed event olarak observe ediyor. Awad bunu vee-validate'le geçirdiği yıllardan çıkmış bir ders olarak anlatıyor.

---

## Slayt 26 — Form Components (kod örnekleri)

Burada kod var. Solda `useTextField` ve `useCalendar` hook'larının döndürdüğü prop bundle'ları görüyorsunuz. Calendar'da sadece prop değiştirerek Gregorian'dan Hijri'ye geçiyorsun, ekstra hiçbir şey yok. Sağda ARIA'nın bir output olduğunu, contract olmadığını gösteriyor — `inputProps` zaten `aria-labelledby`, `aria-describedby`, `aria-invalid`, `aria-required` ve `role: 'combobox'` içeriyor. En altta form transaction log'u var — tek bir tick'te birden çok değişim oluyor, sonraki tick'te sıralanmış, deduped ve uygulanmış olarak çıkıyor. `UNSET` `INIT`'ten önce gelirse stale operation siliniyor.

---

## Slayt 27 — Form Components (biz neredeyiz)

Bu en zengin bağlantı. Search-ads-ui'da `/src-new`'de yedi tane form composable bulduk. Formwerk prototype'ı için en iyi iki aday şunlar:

- `mmp/.../use-goal-form.ts` — iç içe event array'i, her item'da koşullu `customRevenue`, `.refine()` ile doğrulanıyor.
- `settings/.../use-team-members-invite-form.ts` — alanlar arası bağımlılık, `campaignGroupList` sadece `accessType === LimitedAccess` ise zorunlu hale geliyor.

Her hata mesajı bir i18n key path olarak yazılmış — `mmp.goal_create_edit_drawer.form.event_name_required` gibi. Reusable bir `MaField` wrapper'ı yok, her form `defineField()`'i inline çağırıyor.

Action-kit tarafında sürpriz var: `MaForm2` ve `MaFormItem2` zaten headless. Validation logic yok, sadece `severity`, `label`, `message` slot'ları sunuyor. v2'ye geçişin yönü zaten Awad'ın anlattığına doğru — biz farkında olmadan oraya gidiyoruz. En küçük formwerk-tarzı surface'i action-kit'e eklemek için yaklaşık beş dosya yetiyor: `useFormField.ts`, `useFormControl.ts`, `FormFieldProvider.vue`, `useFormContext.ts` ve bunları birleştiren headless bir `<MaField>` wrapper.

Bir sonraki adım: önce search-ads-ui'da `use-goal-form.ts` üzerinde formwerk prototype'ı çıkaralım — en çok pain point'i tetikliyor (iç içe array, koşullu alanlar, i18n key'leri, ARIA wiring). Sonuç iyi olursa primitive'leri action-kit'e taşırız ve bütün tüketici uygulamalarına açarız.

---

## Slayt 28 — Vue Real-Time Apps (bölüm açılışı)

Altıncı ve son konuşma Nico Devs'ten, Tighten'da Lead Programmer. Konu real-time uygulamalar için pratik bir tur.

---

## Slayt 29 — Vue Real-Time Apps (giriş)

Nico'nun yapısı şu: ihtiyacın büyüdükçe stack'in de karmaşıklaşıyor. **Polling** en basit yöntem ama hiçbir zaman gerçek anlamda real-time değil. **SSE** server push, tek yönlü, `useEventSource` ile çalışıyor. **WebSocket** çift yönlü, `useWebSocket` ile geliyor. **WebRTC ve PeerJS** peer-to-peer için, gecikme, gizlilik veya maliyet önemli olduğunda. **Local-First ve CRDT'ler** ise offline çalışıyor, bağlantı geldiğinde sync ediyor. Her adım karmaşıklığı yeni bir özellikle değiş tokuş ediyor.

---

## Slayt 30 — Real-Time (ana hatlar)

Dört tane primitive var, prensip şu: en hafif olanı seç ve onunla başla. **SSE** için `useEventSource('/api/stream')` ile başlıyorsun, otomatik reconnect `retry` ms sonra çalışıyor, `Last-Event-ID` header'ı kaçırılan event'leri replay ediyor. **WebSocket** için `useWebSocket` `autoReconnect` ve `heartbeat` opsiyonlarıyla geliyor. **WebRTC** PeerJS sayesinde SDP boilerplate'i olmadan kullanılıyor — gizlilik default olarak E2E, bandwidth faturası yok. **Local-first**'te data cihazda yaşıyor, CRDT'ler conflict-free merge sağlıyor.

---

## Slayt 31 — Real-Time (biz neredeyiz)

Search-ads-ui tarafında resmi olarak polling, SSE veya WebSocket yok. Ama TanStack Query'nin kısa `staleTime`'larıyla aslında zaten polling yapıyoruz: `useFetchBenchmarkCategoryMetricsQuery` ve `useFetchMonthlyAccountSpendsAsDaily` bir dakika, `useFetchUserAppsQuery` üç dakika. Yani Nico'nun "polling never gives true real-time" eleştirisi tam üstümüze. Knock Labs client `plugins/knock/create-knock-client.ts`'te boot'ta initialize ediliyor, feed plumbing var ama hiçbir event subscription render edilmiyor — yarım bırakılmış. Tek gerçek interval `MaCountdown.vue`'da eski bir `setInterval`.

Action-kit tarafında ise SSE zaten production'da çalışıyor. `components/chatbot/plugin.ts`'te `fetchEventSource` Bedrock'a bağlanıyor, sekiz tipli event, `AbortController`, auth hook'ları ve `[TIMEOUT]` prefix'i — hepsi yerinde. WebSocket veya polling yok, chatbot library'nin tek real-time tüketicisi.

Bir sonraki adım: search-ads-ui'da bir yüzey seçelim — benchmarks dashboard mu, monthly spend tile mı? — bir dakikalık `staleTime`'ın aslında polling ihtiyacını gizlediği bir yer. Oraya SSE getirelim. Aynı zamanda Knock Labs notification feed'ini tamamlayalım — client zaten plumbed, sadece UI tarafı eksik.

---

## Slayt 32 — Diğer konuşmalar (bölüm açılışı)

Bu altı konuşmanın dışında üç tane daha vardı. Onlar için elimde sadece fotoğraf ve notlar var, ileride ayrı bir oturumda detaylı paylaşırım.

---

## Slayt 33 — Diğer katıldığım konuşmalar

Néstor López'in Module Federation konuşması vardı — micro-frontend pattern'larıyla ilgilenenler için iyi bir kaynak. Daniel Roe'nun "Beyond Nuxt 4" konuşması Nuxt squad için stratejik açıdan en önemlisi. Juan Andrés Núñez ise agentic AI ve frontend'i bilimsel bir yaklaşımla ele aldı. Hangisi ilgilendirirse söyleyin, sıraya alırım.

---

## Slayt 34 — Teşekkürler

Bu kadardı. Sorular, ek dipnotlar veya derinleşmek istediğiniz herhangi bir konuşma varsa şimdi konuşalım. Slaytlar ve linkler internal share'de paylaşılacak.

---

## Kısa notlar

- Toplam hedef süre yaklaşık otuz dakika. Sorulara dört-beş dakika ekstra ayırmakta fayda var.
- En interaktif slaytlar: slayt 6 (bugünkü dert — "evet bu benim de derdim" anı), slayt 26 (form transactions kodu) ve her bir "biz neredeyiz" slaytı (herkes kendi kodunu hatırlıyor).
- "Biz neredeyiz" slaytları her konuşmanın sonunda — burada takım somut bir adım görüyor, soru ya da itiraz orada doğuyor.
- Hızlı geçilebilecek slaytlar: bölüm açılışları ve tanıdık gelen intro'lar.
- Tartışma soruları slaytlarda speaker notes olarak duruyor — `o` tuşuyla Slidev presenter'a geçip not panelini açabilirsin.
