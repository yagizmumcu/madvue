---
theme: seriph
background: /img/madrid-team-quote.webp
title: MadVue 2026 – Recap
info: |
  ## MadVue 2026 Recap
  A quick walkthrough of the talks I attended at MadVue 2026.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
duration: 35min
---

# MadVue 2026 — Recap

A walkthrough of the talks I attended in Madrid 🇪🇸

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Let's go <carbon:arrow-right />
</div>

<style>
.slidev-layout.cover {
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-color: #121212 !important;
  align-content: end !important;
  padding-bottom: 2.5rem !important;
}
.slidev-layout.cover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.38) 26%, transparent 50%);
  pointer-events: none;
}
.slidev-layout.cover > * {
  position: relative;
  z-index: 1;
}
.slidev-layout.cover .my-auto {
  margin-top: auto !important;
  margin-bottom: 0 !important;
}
.slidev-layout.cover h1 {
  margin-bottom: 0.25rem;
}
</style>

<!--
Selam, geçen hafta Madrid'deydim, MadVue 2026 konferansındaydım. Arkadaki
fotoğraf da oradan — Bernabéu'da Di Stéfano'nun duvarının önünde otururken
çekildi: "Hiçbir oyuncu, takımın tamamından daha iyi değildir." Bir takım
recap'i için bundan iyi açılış slaytı bulamazdım. Bugün orada gördüğüm en
faydalı konuşmaları sizinle hızlıca paylaşacağım, takım için ne çıkıyor ona
bakacağız. Bazı konuşmaların kayıt linkleri var, bazılarında elimde sadece
fotoğraf ve notlar var — ona göre bazı yerlerde daha çok duracağız.
-->
---
transition: fade-out
hideInToc: true
---

# Agenda for today

<div class="flex gap-10 items-start">

<div class="flex-1">

What we'll cover from MadVue 2026:

<Toc text-sm minDepth="1" maxDepth="1" />

</div>

<div class="w-90 shrink-0 text-center">
  <img :src="'/img/madvue-bros.webp'" class="rounded-lg border border-white/15 w-full h-40 object-cover" alt="Me and Ahmet at the MadVue banner">
  <div class="text-xs op-60 mt-1.5 mb-2">your field-research team, on location 🇪🇸</div>
  <img :src="'/img/saha-arastirmacisi.png'" class="rounded-lg border border-white/15 w-full" alt="">
</div>

</div>

<!--
Yedi konuşma var. Eduardo'nun Type-Safe URLs'i ile başlıyoruz, sonra JS
toolchain'ine geçiyoruz, ardından AI destekli adaptive UI'lar, AI'a hazırlık
için Clean Code, form component'lerinin yeni modeli, real-time uygulamalar ve
en sonda Daniel Roe'nun Nuxt roadmap'i. Her konuşmanın sonunda kısa bir "biz
neredeyiz" slaytı var — orada konuşulanları search-ads-ui ve action-kit'e
bağlayacağız. Sağdaki fotoğraf da saha ekibimiz: ben ve Ahmet, görev başında.
-->
---
layout: section
---

# Type-Safe URLs

Eduardo San Martin Morote

<!--
İlk konuşmacımız Eduardo San Martin Morote, Vue Router'ın maintainer'ı. Konu
basit ama derin: URL'i bir state olarak ele alıyor ve Vue Router 5'in getirdiği
param parser sistemini anlatıyor. Ama önce: Vue Router nedir, herkes için bir
slaytta açıklayalım.
-->
---
hideInToc: true
---

# First — what is Vue Router?

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs mb-3">
  Our apps are <strong>single-page apps</strong>: the browser loads them once, then
  screens change <em>without</em> full page reloads. But users still expect real
  addresses — bookmarks, the back button, links you can share. Something has to
  bridge those two worlds. That something is the <strong>router</strong>.
</div>

**Vue Router is the part of the app that reads the address and decides
what you see.** Every address has the same anatomy:

<div class="rounded border border-white/10 p-4 my-4 font-mono text-base flex flex-nowrap items-start gap-x-1 justify-center">
  <span class="text-center">
    <span class="block op-40">app.example.com</span>
  </span>
  <span class="text-center">
    <span class="block text-teal-300">/products/</span>
    <span class="block text-[10px] font-sans op-60 mt-1">which screen</span>
  </span>
  <span class="text-center">
    <span class="block text-amber-300">42</span>
    <span class="block text-[10px] font-sans op-60 mt-1">which item</span>
  </span>
  <span class="text-center">
    <span class="block text-sky-300">?page=3</span>
    <span class="block text-[10px] font-sans op-60 mt-1">screen settings</span>
  </span>
</div>

The router watches this, shows the matching screen, and hands it the
details. (Backend folks: it's your server-side route mapping —
`/products/:id` → handler — except it resolves in the browser, no
request involved.)

<div class="mt-4 text-xs op-70">
  It's the official router for Vue — maintained by today's speaker — and it's
  exactly <strong>where URL text becomes app data</strong>. Which makes it the natural
  place to validate that text. That's Eduardo's whole thesis.
</div>

<!--
Eduardo'nun konusuna girmeden önce: Vue Router nedir?

Uygulamalarımız "single-page app": tarayıcı uygulamayı bir kere yüklüyor,
sonrasında ekranlar tam sayfa yenilenmeden değişiyor. Ama kullanıcılar hâlâ
gerçek adres bekliyor — yer imi, geri tuşu, paylaşılabilir link. Bu iki dünyayı
birleştiren şey router.

Vue Router, adresi okuyup ne göreceğinize karar veren parça. Her adresin
anatomisi aynı — slayttaki örnek: /products/ hangi ekran, 42 hangi kayıt,
?page=3 ekran ayarları. Router bunu izliyor, eşleşen ekranı gösteriyor ve
detayları o ekrana iletiyor.

Backend'ciler için tek cümle: sizin sunucu tarafı route mapping'inizin
tarayıcıda çalışan hali — /products/:id bir handler'a gidiyor, ama istek
sunucuya hiç gitmiyor.

Resmi Vue router'ı ve maintainer'ı bugünkü konuşmacımız. Bu konuşma için
önemi şu: URL metninin uygulama verisine dönüştüğü yer tam olarak router —
yani o metni doğrulamanın da doğal adresi orası. Eduardo'nun bütün tezi bu.
-->
---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Type-Safe URLs

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="'/img/eduardo-san-martin.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Eduardo San Martin Morote">
  <span><strong>Eduardo San Martin Morote</strong> — Vue Router maintainer · 11:15</span>
</div>

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs my-2">
💡 <strong>In plain terms:</strong> the address bar already stores what you're
looking at — page, filters, dates. Share the link and the other person sees
<em>exactly</em> your screen. The talk: stop hand-checking that text on every
page; let the framework guarantee it.
</div>

The URL is a **first-class state container** with three superpowers:

- **Teleportation** — share a link, land in the same state
- **Time travel** — back/forward = free undo/redo
- **Server ↔ client** — redirects, auth flows, SSR hydration

The catch: the URL is just text, so today every page re-checks it by
hand, with copy-pasted code. **Vue Router 5**'s answer: validate once,
inside the router (**param parsers**) — pages receive typed values.

</div>

::right::

<div class="rounded border border-white/10 p-4 text-sm">

### 🔗 Resources

- 📺 Official recording (30:54)
  <div class="opacity-70 text-xs break-all">
    <a href="https://www.youtube.com/watch?v=1o9EvJ-4cbs" target="_blank">
      youtube.com/watch?v=1o9EvJ-4cbs
    </a>
  </div>

- 📊 Slides · live demo
  <div class="opacity-70 text-xs break-all">
    <a href="https://esm.is/2026-talk-typed-url-slides" target="_blank">esm.is/2026-talk-typed-url-slides</a> ·
    <a href="https://esm.is/2026-talk-typed-url-demo" target="_blank">…-demo</a>
  </div>

- 📦 Vue Router
  <div class="opacity-70 text-xs break-all">
    <a href="https://github.com/vuejs/router" target="_blank">github.com/vuejs/router</a>
  </div>

- 👤 Speaker
  <div class="opacity-70 text-xs break-all">
    <a href="https://esm.dev" target="_blank">esm.dev</a> ·
    <a href="https://github.com/posva" target="_blank">@posva</a>
  </div>

</div>

<!--
Eduardo'nun bakış açısı şu: URL aslında diğer state container'larının
yapamadığı üç şeyi yapabilen birinci sınıf bir state aslında. Bunlar şöyle:
teleport — linki paylaşıyorsun, karşı taraf aynı state'e iniyor. Zamanda
yolculuk — browser'ın geri/ileri butonları bedava undo/redo gibi çalışıyor.
Ve sunucu ile istemci arasında iletişim — redirect, auth flow, SSR hydration,
hepsi URL üzerinden.

Ama bir sıkıntı var: URL bir string. Bu yüzden bugün her sayfa aynı Number(),
NaN kontrolü, JSON.parse dansını tekrar tekrar yapıyor. Vue Router 5'in cevabı
bu işi router'a taşımak — sayfalar artık tip güvenli prop alıyor. Önemli haber:
unplugin-vue-router artık core'a merge edildi. Önce bugünkü acıya bakalım,
sonra çözümü canlı görelim.
-->
---
hideInToc: true
---

# Type-Safe URLs — the pain today

<div class="text-xs op-70 mb-2">
  The URL hands every page <strong>raw text</strong>. Before trusting any of it,
  the page has to defend itself — three different ways:
</div>

<div grid="~ cols-2 gap-4" class="text-sm">

<div>

<div class="text-xs op-70 mb-1">① Want the product id <em>as a number</em>? Convert it and double-check it yourself:</div>

```ts
const route = useRoute()

const id = Number(route.params.id)   // "42" → 42… or NaN
if (!Number.isNaN(id)) { /* finally safe to use */ }
// ↑ 3 lines of defense — for ONE number
```

</div>

<div>

<div class="text-xs op-70 mb-1">② Reading <code>?page=</code> safely means guessing: missing? a list? not a number?</div>

```ts
const page = Array.isArray(route.query.page)
  ? 1                                  // it was a list?! → give up
  : Number.isInteger(Number(route.query.page))
    ? Number(route.query.page)         // a real number → use it
    : 1                                // garbage → fall back to 1
```

</div>
</div>

<div class="text-xs op-70 mt-4 mb-1">③ …and even the page layout must ask <em>"did the checks pass?"</em> before it dares to render:</div>

```vue
<template v-if="typeof id === 'number'">  <!-- checks passed → show the page -->
  <ProductDetails :id />
</template>
<ErrorBox v-else />                        <!-- checks failed → show an error -->
```

<div class="mt-3 text-xs op-60">
  Now multiply this by <strong>every parameter on every page</strong> of the app.
</div>

<!--
Eduardo bu slaytta bugünkü acıyı somutlaştırdı. Path param string | string[]
tipinde geliyor, bu yüzden elle Number() çevirip Number.isNaN kontrolü yapmak
zorundasın. Query param daha kötü: string | null | (string | null)[]. Bunu
güvenli okumak için iç içe ternary yazmak zorunda kalıyorsun. En kötüsü de
validation'ın template'e sızması — <template v-if="typeof id === 'number'">
ile sarmadan kullanamıyorsun. Bu üç slayt arka arkaya gösterildiğinde salonda
herkes başını sallıyor. Şimdi aynı URL'lerin çözümle nasıl davrandığını canlı
görelim.
-->
---
hideInToc: true
---

# Type-Safe URLs — live demo

<div class="text-xs op-60 mb-3">
  The same URLs that needed all that defensive code — now the router handles them.
  Break them and watch each param fail <em>its own designed way</em>:
</div>

<DemoTypedUrl />

<div class="mt-4 text-xs op-50">
  Path param fails → the page doesn't exist (404). Query param fails → the page
  still loads, with a sane default. Nobody wrote a single <code>Number()</code> check.
</div>

<!--
Burada canlı görelim. URL'deki id'yi bozun — mesela "abc" yazın — sayfa 404
oluyor, çünkü path param parse edilemezse o sayfa yok demektir. Ama page
query'sini bozarsanız sayfa yüklenmeye devam ediyor, sadece default değere
düşüyor. İkisi de bilinçli kararlar ve kimse tek bir Number() kontrolü yazmadı.
Teknik olmayan arkadaşlar için: bozuk bir link artık ya düzgün bir "bulunamadı"
sayfası ya da mantıklı bir varsayılan gösteriyor — yarı bozuk bir ekran değil.
-->
---
hideInToc: true
---

# Type-Safe URLs — adopting it is four small steps

<div grid="~ cols-2 gap-x-6 gap-y-4" class="text-sm">

<div>

<div class="text-xs op-70 mb-1">① Flip one switch in the build config…</div>

```ts
vueRouter({
  experimental: { paramParsers: true },  // ← that's the switch
}),
```

</div>

<div>

<div class="text-xs op-70 mb-1">② …swap in the new router (two imports)…</div>

```ts
import { experimental_createRouter as createRouter }
  from 'vue-router/experimental'

export const router = createRouter({ history, resolver })
```

</div>

<div>

<div class="text-xs op-70 mb-1">③ …and the <em>filename</em> now declares what the page expects:</div>

```text
src/pages/products/[id=int].vue
                       ↑ "id must be a whole number"
→ the page receives a real number, pre-checked
```

</div>

<div>

<div class="text-xs op-70 mb-1">④ Your own type (say, a date) = two tiny functions: how to read it, how to write it</div>

```ts
export const parser = defineParamParser({
  get: (v) => {                    // URL text → Date
    const d = new Date(v)
    if (isNaN(d.getTime())) miss() // miss() = "this URL is invalid"
    return d
  },
  set: (v) => v.toISOString().split('T')[0],  // Date → URL text
})
```

</div>

</div>

<!--
Adoption şu dört adımda oluyor. Birinci adım: vite.config.ts'te vueRouter
plugin'ine experimental: { paramParsers: true } ekliyorsun. İkinci adım:
router'ı vue-router/experimental'dan experimental_createRouter ile
oluşturuyorsun, resolver'ı vue-router/auto-resolver'dan alıyorsun. Üçüncü
adım: sayfayı [id=int].vue diye isimlendiriyorsun, int ve bool built-in
olarak geliyor. Dördüncü adım: özel bir tip lazımsa src/params/ altına bir
dosya atıyorsun, defineParamParser({ get, set }) ile yazıyorsun, parse
başarısız olduğunda miss() çağırıyorsun. Hepsi bu kadar.
-->
---
hideInToc: true
---

# Type-Safe URLs — takeaways

<div class="text-xs op-70 mb-2">
  If you remember one thing: <strong>pages stop guessing what's in the URL — the
  router guarantees it.</strong> Four shifts, shown as the code they replace:
</div>

<div grid="~ cols-2 gap-x-6 gap-y-4" class="text-sm">

<div>

<div class="text-xs op-70 mb-1">① Turning it on is one line — not a rewrite</div>

```ts
experimental: { paramParsers: true }
```

</div>

<div>

<div class="text-xs op-70 mb-1">② The filename declares the type; the page gets a ready-to-use value</div>

```text
[id=int].vue  →  the page receives  id = 42  (a number)
```

</div>

<div>

<div class="text-xs op-70 mb-1">③ Your own types = two functions: read it, write it</div>

```text
get:  URL text  →  value   (call miss() if invalid)
set:  value     →  URL text
```

</div>

<div>

<div class="text-xs op-70 mb-1">④ Failures are <em>designed</em>, not accidental</div>

```text
broken path   /products/abc  →  clean "page not found"
broken query  ?page=abc      →  page loads, sane default
```

</div>

</div>

<div class="mt-4 text-xs op-70">
  <span class="opacity-60">What to try at work:</span>
  port one messy page to a param parser · audit URL-vs-Pinia duplicates ·
  add a shared parser for dates / sort dir · document the pattern.
</div>

<div class="mt-2 text-xs opacity-50">
  📺 Official recording:
  <a href="https://www.youtube.com/watch?v=1o9EvJ-4cbs" target="_blank">youtube.com/watch?v=1o9EvJ-4cbs</a>
</div>

<!--
Burada konuşmadan çıkan dört ana fikri, her birini bir kod örneğiyle koydum.
Birincisi: aktive etmek tek bir flag — experimental: { paramParsers: true }.
İkincisi: dosya adı parser'ı seçiyor, [id=int].vue yazdığında param doğrudan
number geliyor. Üçüncüsü: kendi parser'ın iki fonksiyondan ibaret, get ve set.
Dördüncüsü: path ve query farklı davranıyor — path parse fail olursa 404,
query parse fail olursa default değere düşüyor ama route eşleşmeye devam ediyor.
-->
---
hideInToc: true
---

# Type-Safe URLs — five minutes in the hallway

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs mb-3">
🤝 The best part of a conference isn't always on stage. <strong>Ahmet</strong>
introduces <strong>qpick</strong> — a URL-parser library for Vue. He showed it
to Eduardo in the hallway.
</div>

<div class="grid grid-cols-[5fr_5fr_3fr] gap-x-5 text-sm">

<div>

<div class="text-xs op-60 mb-1">Eduardo's five-minute review</div>

He spotted a missing concept: **idempotency**.

> "When you parse a value from the URL and serialize it back,
> you should get the same string. **Always.**"

In plain terms: read the address, write it back — **nothing may
change**. Otherwise the URL flickers under the user and the
history fills with junk copies of the same page.

</div>

<div>

<div class="text-xs op-60 mb-1">What shipped days later (alpha-2)</div>

- Custom equality (`eq`) **removed** — two values are equal *iff*
  they serialize to the same string. One rule instead of
  per-parser logic.
- `createParser` → `defineParser`, matching Vue's
  `defineComponent` / `defineStore` conventions.

```ts
parse(serialize(parse(str)))
  === parse(str)
```

</div>

<div>

<img :src="'/img/ahmet-eduardo.webp'" class="rounded-lg border border-white/15 w-full h-44 object-cover" alt="Ahmet and Eduardo discussing qpick at MadVue 2026">
<div class="text-[10px] op-50 mt-1 text-center">the actual five minutes — Ahmet & Eduardo, MadVue 2026</div>

<div class="grid grid-cols-2 gap-1.5 mt-2">
  <img :src="'/img/eduardo-yagiz.webp'" class="rounded border border-white/15 h-24 w-full object-cover" alt="Eduardo and me">
  <img :src="'/img/arda-bill.png'" class="rounded border border-white/15 h-24 w-full object-cover" alt="">
</div>

</div>

</div>

<div class="mt-4 text-xs op-60">
  📝 The full story:
  <a href="https://www.tinas.dev/writing/how-five-minutes-at-madvue-reshaped-qpick-api" target="_blank">
    tinas.dev — "How five minutes at MadVue reshaped qpick's API"
  </a>
  &nbsp;·&nbsp; 📦 <a href="https://npmx.dev/package/qpick" target="_blank">npmx.dev/package/qpick</a>
  <span class="op-60">(v1.0.0-alpha.2 — the post's changes, shipped)</span>
  &nbsp;·&nbsp; <a href="https://github.com/tinas/qpick" target="_blank">github.com/tinas/qpick</a>
</div>

<!--
Konferansın en iyi kısmı her zaman sahnede olmuyor. Ahmet, Vue için qpick
diye bir URL-parser kütüphanesi geliştiriyor. Koridorda Eduardo'ya gösterdi —
beş dakikalık bir sohbet.

Eduardo, aylarca emek verilmiş kütüphanede gözden kaçan şeyi anında yakaladı:
idempotency. Kuralı şu: URL'den bir değeri okuyup geri yazdığında aynı string'i
almalısın — her zaman. Teknik olmayan arkadaşlar için: adresi oku, geri yaz —
hiçbir şey değişmemeli. Aksi halde URL kullanıcının altında titreşiyor ve
tarayıcı geçmişi aynı sayfanın kopyalarıyla doluyor.

Ahmet birkaç gün içinde alpha-2'yi yayınladı: custom equality fonksiyonunu
tamamen kaldırdı — iki değer ancak ve ancak aynı string'e serialize oluyorsa
eşit. Parser başına özel mantık yerine tek kural. Bir de createParser'ı
defineParser yaptı, Vue'nun defineComponent ve defineStore geleneğine uysun
diye.

Hikayenin tamamı tinas.dev'de, paket de npm'de yayında — 1.0.0-alpha.2,
yani yazıdaki değişiklikler gerçekten ship edilmiş durumda. Denemek isteyen
npmx.dev/package/qpick'ten bakabilir. Buradan çıkan ders: konferans biletinin
parasını bazen beş dakikalık koridor sohbeti çıkarıyor.

Alttaki iki kareye dair tek kelime etmiyorum — ben de Eduardo ile fotoğraf
çektirdim, yanındaki referans karesini bilenler bilir.
-->
---
hideInToc: true
---

# Type-Safe URLs — our state

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs mb-3">
🎯 <strong>Where we stand:</strong> we have exactly the pain Eduardo described —
every screen checks the URL by hand, and some don't check at all.
</div>

<div grid="~ cols-2 gap-x-6 gap-y-4" class="text-sm">

<div>

<div class="text-xs op-60 mb-1">📍 search-ads-ui (our main app)</div>

- Screens read filters and dates from the URL **by hand** — the same
  checking code is copy-pasted across the app.
- Some screens **don't validate at all**: a malformed link reaches the
  API and comes back as a confusing error instead of a clean fallback.

</div>

<div>

<div class="text-xs op-60 mb-1">⚠️ The bigger gap — links don't share state</div>

When you change filters in the app, **the URL doesn't update**.
Copy the link, send it to a teammate — they *don't* see your screen.

We lose the "teleportation" superpower entirely: URL → app works,
app → URL doesn't.

<div class="text-xs op-60 mt-3">(action-kit is a component library — no pages, so not affected.)</div>

</div>

</div>

<div class="mt-4 text-xs op-70">
  <span class="opacity-60">Next:</span>
  pick one small screen, validate its URL properly, and make the URL update with
  the filters. Adopt Vue Router 5's parsers once they stabilize.
</div>

<!--
Şimdi bize bakalım. Tek cümlelik özet: Eduardo'nun anlattığı acı birebir bizde
var — ekranlar URL'i elle kontrol ediyor, bazıları hiç etmiyor. Bozuk bir link
temiz bir "bulunamadı" yerine API'den dönen anlamsız bir hata olarak
görünebiliyor.

Ama daha büyük eksik şu — bunu teknik olmayan arkadaşlar için de söylüyorum:
uygulamada filtreleri değiştirdiğinizde URL güncellenmiyor. Yani linki kopyalayıp
bir arkadaşınıza attığınızda o sizin gördüğünüz ekranı görmüyor. Eduardo'nun
"teleportation" dediği süper gücü tamamen kaybediyoruz.

Action-kit bir component library, kendi sayfası yok — bu konu onu etkilemiyor.

Bir sonraki adım: küçük bir ekran seçip önce orayı düzgün doğrulayalım ve
filtre değişince URL de güncellensin. Vue Router 5'in parser'ları stabil
olunca da deneriz.
-->
---
layout: section
---

# Oxc, Rolldown, Vitest, Vite

The future of the JavaScript toolchain · Élise Patrikainen · 11:55

<!--
İkinci konuşma VoidZero'dan Élise Patrikainen'in. Konu Evan You'nun startup'ı
VoidZero'nun inşa ettiği, Rust üzerine kurulu bütünleşik bir toolchain. Ama
önce iki slaytlık bir zemin: bu araçlar neden var ve ne işe yarıyorlar.
-->
---
hideInToc: true
---

# Why do build tools even exist? — 20 years in one slide

<div class="text-xs op-70 mb-3">
  Every era below solved the <em>previous</em> era's pain. The talk is about the newest era.
</div>

<div class="text-sm space-y-2.5">

<div class="flex gap-3 items-baseline">
  <div class="w-22 shrink-0 text-xs op-50 text-right font-mono">~2005</div>
  <div><strong>No build step.</strong> A website was a handful of files you copied
  to a server. Simple — until apps got big.</div>
</div>

<div class="flex gap-3 items-baseline">
  <div class="w-22 shrink-0 text-xs op-50 text-right font-mono">2012 · webpack</div>
  <div><strong>The bundler era.</strong> Apps became thousands of files, but JavaScript
  had no way to organize them — so <strong>webpack</strong> invented one: bundle everything
  into a package the browser can load. <strong>Babel</strong> joined to translate modern code
  for old browsers. The cost: notorious config files and <strong>builds measured in minutes</strong>.</div>
</div>

<div class="flex gap-3 items-baseline">
  <div class="w-22 shrink-0 text-xs op-50 text-right font-mono">2020 · Vite</div>
  <div><strong>The instant era.</strong> Browsers had learned to load modules natively, so
  <strong>Vite</strong> (by Vue's creator) skips bundling <em>while you develop</em>: start in
  milliseconds, see every save instantly. The "save → see it" loop stopped being a coffee break.
  <span class="op-60">(This is what we use today.)</span></div>
</div>

<div class="flex gap-3 items-baseline">
  <div class="w-22 shrink-0 text-xs op-50 text-right font-mono">now · Rust</div>
  <div><strong>The native-speed era.</strong> The tools themselves were still written in
  JavaScript — rewrite them in <strong>Rust</strong> (a much faster systems language) and
  everything gets <strong>10–100× faster again</strong>: Oxc, Oxlint, Rolldown. That's
  VoidZero's project, and that's this talk.</div>
</div>

</div>

<!--
Élise'in konuşmasına girmeden önce: bu araçlar neden var? Yirmi yıl, tek slayt.
Her dönem bir önceki dönemin acısını çözüyor.

2005 civarı: build diye bir şey yoktu. Bir web sitesi birkaç dosyaydı, sunucuya
kopyalardınız. Uygulamalar büyüyene kadar bu yeterliydi.

2012, webpack dönemi: uygulamalar binlerce dosya oldu ama JavaScript'in dosyaları
organize edecek bir mekanizması yoktu. Webpack bunu icat etti: her şeyi tarayıcının
yükleyebileceği bir pakete bundle'lamak. Babel de modern kodu eski tarayıcılar
için çevirdi. Bedeli: meşhur config cehennemi ve dakikalarla ölçülen build'ler.

2020, Vite dönemi: tarayıcılar artık modülleri native yükleyebiliyordu. Vue'nun
yaratıcısının yazdığı Vite, geliştirme sırasında bundle'lamayı tamamen atladı —
milisaniyede başlıyor, her kayıt anında görünüyor. "Kaydet → gör" döngüsü kahve
molası olmaktan çıktı. Bugün kullandığımız bu.

Şimdi, Rust dönemi: araçların kendisi hâlâ JavaScript ile yazılmıştı. Çok daha
hızlı bir sistem dili olan Rust ile yeniden yazınca her şey bir on-yüz kat daha
hızlanıyor: Oxc, Oxlint, Rolldown. VoidZero'nun projesi bu, bugünkü konuşma da bu.
-->
---
hideInToc: true
---

# First — what do these tools actually do?

<div class="text-xs op-60 mb-3">
  Developers write <strong>hundreds of human-friendly files</strong>; users need
  <strong>a few tiny, fast ones</strong>. The "toolchain" is the factory in between —
  and these are its stations:
</div>

<div class="grid grid-cols-2 gap-3 text-sm">

<div class="rounded border border-white/10 p-3 flex gap-3 items-start">
  <img :src="'/img/eslint-icon.png'" class="w-9 h-9 mt-0.5" alt="ESLint">
  <div>
    <div class="font-semibold">Linter <span class="text-xs op-50 font-normal">— ESLint, now Oxlint</span></div>
    <div class="text-xs op-70 mt-0.5">The <strong>proof-reader</strong>. Scans code for
    bugs and style mistakes before users ever see them — spell-check for code.</div>
  </div>
</div>

<div class="rounded border border-white/10 p-3 flex gap-3 items-start">
  <img :src="'/img/oxc.svg'" class="w-9 h-9 mt-0.5" alt="Oxc">
  <div>
    <div class="font-semibold">Compiler <span class="text-xs op-50 font-normal">— Oxc</span></div>
    <div class="text-xs op-70 mt-0.5">The <strong>translator</strong>. Turns the languages
    developers prefer (TypeScript, Vue) into the plain JavaScript browsers actually run.</div>
  </div>
</div>

<div class="rounded border border-white/10 p-3 flex gap-3 items-start">
  <img :src="'/img/rolldown.svg'" class="w-9 h-9 mt-0.5" alt="Rolldown">
  <div>
    <div class="font-semibold">Bundler <span class="text-xs op-50 font-normal">— Rollup, now Rolldown</span></div>
    <div class="text-xs op-70 mt-0.5">The <strong>packer</strong>. Squeezes hundreds of source
    files into a few small, optimized ones so the app downloads and starts fast.</div>
  </div>
</div>

<div class="rounded border border-white/10 p-3 flex gap-3 items-start">
  <img :src="'/img/vitest.svg'" class="w-9 h-9 mt-0.5" alt="Vitest">
  <div>
    <div class="font-semibold">Test runner <span class="text-xs op-50 font-normal">— Vitest</span></div>
    <div class="text-xs op-70 mt-0.5">The <strong>inspector</strong>. Re-runs thousands of
    automated checks after every change to prove nothing broke.</div>
  </div>
</div>

</div>

<div class="rounded border border-teal-400/30 p-3 mt-3 flex gap-3 items-center text-sm">
  <img :src="'/img/vite.svg'" class="w-9 h-9" alt="Vite">
  <div>
    <span class="font-semibold">Build tool / dev server — Vite.</span>
    <span class="text-xs op-70">The <strong>conductor</strong>: runs the whole factory instantly while
    developing, then drives every station for the production build. The talk: VoidZero is rebuilding
    every station in Rust on one shared engine (Oxc) — that's where the 10–100× comes from.</span>
  </div>
</div>

<!--
Élise'in rakamlarına geçmeden önce bu araçların ne olduğunu netleştirelim —
çünkü bu isimler frontend dışındakiler için hiçbir şey ifade etmiyor.

Şöyle düşünün: geliştiriciler insanın okuyabileceği yüzlerce dosya yazar;
kullanıcıların ise birkaç tane küçük ve hızlı dosyaya ihtiyacı var. İkisinin
arasındaki fabrika "toolchain" dediğimiz şey. İstasyonları şunlar:

- Linter (ESLint, yenisi Oxlint): düzeltmen. Kod için yazım denetimi gibi —
  hatalar kullanıcıya ulaşmadan yakalanır.
- Compiler (Oxc): çevirmen. Geliştiricilerin tercih ettiği dilleri (TypeScript,
  Vue) tarayıcının gerçekten çalıştırdığı düz JavaScript'e çevirir.
- Bundler (Rollup, yenisi Rolldown): paketleyici. Yüzlerce dosyayı birkaç
  küçük, optimize dosyaya sıkıştırır — uygulama hızlı açılır.
- Test runner (Vitest): müfettiş. Her değişiklikten sonra binlerce otomatik
  kontrolü yeniden koşturur, bir şeyin bozulmadığını kanıtlar.
- Vite ise orkestra şefi: geliştirme sırasında fabrikayı anında çalıştırır,
  production build'de bütün istasyonları yönetir.

Konuşmanın özü: VoidZero bütün istasyonları Rust'la, tek bir ortak motor (Oxc)
üzerinde yeniden inşa ediyor — on ila yüz kat hızlanma oradan geliyor. Önce
Élise'in rakamlarına bakalım, sonra farkı canlı yarıştıracağız.
-->
---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# The future of the JS toolchain

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="'/img/elise-patrikainen.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Élise Patrikainen">
  <span><strong>Élise Patrikainen</strong> (VoidZero) · 11:55</span>
</div>

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs my-2">
💡 <strong>In plain terms:</strong> the tools that turn our source code into
the app users load are being rewritten in a faster language (Rust). Checks
and builds that took minutes drop to seconds.
</div>

A tour of the **unified toolchain** built by VoidZero (the startup of
Evan You, Vue's creator). Headline numbers:

- **oxlint** (code checker) — 50–100× faster than ESLint
- **Rolldown** (bundler) — 10–30× faster than Rollup
- Parsing / transforming / resolving — 3× to 28× faster

The pitch: one Rust core powering dev, lint, test, and production —
instead of separate tools loosely glued together.

</div>

::right::

<div class="rounded border border-white/10 p-4 text-sm">

### 🔗 Resources

- 📺 Talk recording (same talk, BeJS)
  <div class="opacity-70 text-xs break-all">
    <a href="https://www.youtube.com/watch?v=BnjjUAQZ4CI" target="_blank">
      youtube.com/watch?v=BnjjUAQZ4CI
    </a>
  </div>

- 🏢 VoidZero
  <div class="opacity-70 text-xs break-all">
    <a href="https://voidzero.dev" target="_blank">voidzero.dev</a>
  </div>

- 📦 Oxc · Rolldown · Vitest
  <div class="opacity-70 text-xs break-all">
    <a href="https://oxc.rs" target="_blank">oxc.rs</a> ·
    <a href="https://rolldown.rs" target="_blank">rolldown.rs</a> ·
    <a href="https://vitest.dev" target="_blank">vitest.dev</a>
  </div>

</div>

<div class="text-xs opacity-60 mt-3">
  Élise gave the same talk at MadVue 2026 — the linked recording
  is from BeJS, used here as a reference.
</div>

<!--
Slaytta hız rakamları var, özet şu: Oxc parser SWC'den üç kat, transform dört
kat, resolver yirmi sekiz kat hızlı. Oxlint ESLint'ten elli ila yüz kat,
Rolldown Rollup'tan on ila otuz kat hızlı. Ana mesaj şu: tek bir Rust core ile
dev, lint, test ve prod'u besleyebilirsin.
-->
---
hideInToc: true
---

# Toolchain — live demo

<div class="text-xs op-60 mb-3">
  The same app, built twice — today's factory vs. the Rust factory.
  Speeds use the real-world ratios from the talk:
</div>

<DemoToolchain />

<!--
Aynı uygulamayı iki fabrikada birden derliyoruz. Run'a basın.

Üstteki şerit bugünkü JavaScript tabanlı fabrika: ESLint kodu kontrol ediyor,
Rollup paketliyor. Alttaki ise VoidZero'nun Rust fabrikası: Oxlint ve Rolldown
— aynı işin aynısı. Hız oranları konuşmadaki gerçek oranlar: lint elli ila yüz
kat, bundle on ila otuz kat.

Alttaki şerit bitti bile — üstteki hâlâ çalışıyor, kahve emojisine dikkat.
Teknik olmayan arkadaşlar için anlamı şu: bu bekleme her kayıtta, her commit'te,
her deploy'da yaşanıyor — günde onlarca kez, ekipteki her geliştirici için.
Saniyeler çarpıla çarpıla haftada saatlere dönüşüyor. Élise'in rakamlarının
gerçek hayattaki karşılığı bu.
-->
---
hideInToc: true
---

# Toolchain — takeaways

<div grid="~ cols-2 gap-6" class="mt-4">

<div>

### What's changing

- One Rust core (Oxc) shared across lint / transform / bundle
- `rolldown-vite` as a (mostly) drop-in faster build
- Vitest moving onto the same pipeline
- VoidZero shipping it as a coherent product, not isolated tools

</div>

<div>

### What to try at work

- Benchmark `rolldown-vite` on our biggest app
- Try `oxlint` as a pre-filter alongside ESLint, measure CI time
- Watch for the Vitest + Rolldown integration
- Keep an eye on plugin compatibility

</div>

</div>

<div class="mt-8 text-xs opacity-60">
  📺 Reference recording (BeJS — same talk):
  <a href="https://www.youtube.com/watch?v=BnjjUAQZ4CI" target="_blank">youtube.com/watch?v=BnjjUAQZ4CI</a>
</div>

<!--
Bizim için iki somut deneme çıkıyor. Birincisi rolldown-vite — en büyük
uygulamamızda drop-in olarak denenebilir. İkincisi oxlint'i ESLint'in yanında
pre-filter olarak çalıştırıp CI süresini ölçmek. Vitest'in Rolldown pipeline'ına
geçişi de yolda. Plugin uyumluluğunu da takip etmek lazım.
-->
---
layout: section
---

# Adaptive UIs with Vue and AI

What if your UI could build itself? · Markus Oberlehner · 10:10

<!--
Üçüncü konuşma Markus Oberlehner'dan. LLM stream ettikçe büyüyen JSON'a göre
canlı render olan adaptive UI'lar üzerine.
-->
---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Adaptive UIs with Vue and AI

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="'/img/markus-oberlehner.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Markus Oberlehner">
  <span><strong>Markus Oberlehner</strong> — DX Engineer @ Storyblok · 10:10</span>
</div>

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs my-2">
💡 <strong>In plain terms:</strong> instead of designers pre-building every
screen, an AI assembles it live from an approved box of building blocks.
LEGO — the AI writes the instructions, we manufacture the bricks.
</div>

His starting point: AI app-builders (v0 & co.) give good results, but
you wait **minutes**. Markus wants the screen to appear **as you ask** —
and found three ingredients that make it work:

1. An **intelligent *and fast*** model — speed is a feature
2. An **efficient spec** — the AI writes a tiny "shopping list" of
   approved blocks, never actual code
3. A **streamable format** — the screen renders from the half-finished
   answer instead of waiting for the end

</div>

::right::

<div class="rounded border border-white/10 p-4 text-sm">

### 🔗 Resources

- 📊 Slides
  <div class="opacity-70 text-xs break-all">
    <a href="https://talk-adaptive-uis-madvue-2026.oberlehner.work/1" target="_blank">
      talk-adaptive-uis-madvue-2026.oberlehner.work
    </a>
  </div>

- 💻 Demo repo
  <div class="opacity-70 text-xs break-all">
    <a href="https://code.oberlehner.work/markus/talk-adaptive-uis-madvue-2026-demo" target="_blank">
      code.oberlehner.work/.../demo
    </a>
  </div>

</div>

<div class="text-xs opacity-60 mt-3">
  No public video yet — links to the original slides and demo.
</div>

<!--
Önce teknik olmayan arkadaşlar için tek cümle: normalde her ekranı bir
tasarımcı önceden kurar; burada ekranı çalışma anında bir AI kuruyor — ama
sadece bizim onayladığımız hazır yapı taşlarından. LEGO gibi: tuğlaları biz
üretiyoruz, talimatı AI yazıyor. Bu yüzden AI saçmalasa bile ekran markamızın
dışına çıkamıyor.

Markus'un çıkış noktası şu: v0 gibi AI uygulama kurucuları iyi sonuç veriyor
ama dakikalarca bekliyorsunuz. O, ekranın siz sorarken belirmesini istiyor.
Bunu mümkün kılan üç malzeme var: bir, hem akıllı hem hızlı bir model — hız
lüks değil, özelliğin kendisi. İki, verimli bir tarif: AI kod yazmıyor,
onaylı bloklardan kısa bir alışveriş listesi yazıyor. Üç, stream edilebilir
bir format: ekran cevabın yarısından render olmaya başlıyor. Şimdi bunu canlı
görelim.
-->
---
hideInToc: true
---

# Adaptive UIs — live demo

<div class="text-xs op-60 mb-2">
  A user asks a question. No screen for it exists. Watch one get built — and watch
  what changes when the model is slow:
</div>

<DemoAdaptiveStream />

<!--
Senaryo şu: bir kullanıcı soru soruyor — "bu ay sipariş girişimiz nasıl
gidiyor?" — ve bu soru için hazırlanmış bir ekran yok. Ask'e basın.

Solda AI'ın cevabı akıyor. Dikkat: bu kod değil — onaylı bloklardan oluşan
kısacık bir alışveriş listesi: bir başlık, üç metrik kartı, bir çubuk grafik.
Sağda ekran, cevap daha yarıdayken kurulmaya başlıyor: başlık geliyor, kartlar
iskelet olarak beliriyor, verisi tamamlanınca doluyor, en sonda grafik
yükseliyor.

İki numara daha var. Üstteki model seçiciye basın — yavaş modele geçin, hatta
stream'in ortasında değiştirin: ekranın kuruluş hızı bire bir modelin hızı.
Markus'un "hız bir özelliktir" dediği şey bu; sunumda model benchmark'ları
bile gösterdi. Ve en alttaki kutu: AI'ın kullanabileceği onaylı bloklar.
Kullandıkları yeşil yanıyor. RawHTML'in üstü çizili — onaylı sette yok, AI
isteyemiyor. Güvenlik buradan geliyor: AI beşinci bir blok icat edemez.
-->
---
hideInToc: true
---

# Adaptive UIs — how it works under the hood

<div class="text-xs op-70 mb-2">
  Left: the AI's "shopping list" arriving piece by piece — the screen can render
  after <em>every</em> line. Right: the one Vue trick that makes that possible.
</div>

<div grid="~ cols-2 gap-6">

<div>

<div class="text-xs op-70 mb-1">The order list grows as the AI writes (watch it build ↓)</div>

````md magic-move {lines: true}
```json
{ "dataSources": [
  "orderIntake(...) -> orders"
] }
```
```json
{ "dataSources": [
  "orderIntake(...) -> orders"
],
  "children": [
    { "section": { "headline": "…" } }
  ]
}
```
```json
{ "dataSources": ["orderIntake(...) -> orders"],
  "children": [{
    "metricCard": {
      "eyebrow": "Total Order Intake",
      "number":  "expr>async () =>
                  (await orders).reduce(
                    (s, r) => s + r.value, 0)",
      "numberPrefix": "€"
    }
  }]
}
```
````

</div>

<div>

<div class="text-xs op-70 mb-1">Every card accepts its data <em>now</em>… or <em>later</em> (a promise):</div>

```ts
defineProps<{
  eyebrow?: MaybeLazy<string>          // "MaybeLazy" =
  number?:  MaybeLazy<number | string> //   the value itself,
}>()                                   //   or "it's on its way"
```

<div class="text-xs op-70 mt-3 mb-1">…and while the value is "on its way", it shows a skeleton by itself:</div>

```vue
<BaseAwait :value="props.number">
  <template #default="{ value }">{{ value }}</template>  <!-- arrived → show it -->
  <template #loading><Skeleton /></template>             <!-- not yet → shimmer -->
</BaseAwait>
```

</div>
</div>

<div class="mt-3 text-xs opacity-60">
  <a href="https://code.oberlehner.work/markus/talk-adaptive-uis-madvue-2026" target="_blank">slides repo</a> ·
  <a href="https://code.oberlehner.work/markus/talk-adaptive-uis-madvue-2026-demo" target="_blank">demo repo</a> ·
  partial JSON repaired with <a href="https://npmx.dev/package/jsonrepair" target="_blank">jsonrepair</a>
</div>

<!--
Burada gerçek kod var. Sol tarafta JSON LLM stream ederken nasıl büyüyor
görüyorsunuz. Sağda Vue tarafı: MaybeLazy<T> prop'lar ve BaseAwait
component'iyle skeleton gösteriyorsun. expr> ile LLM inline expression yazıp
dataSources üzerine closure kurabiliyor. Bu setup'ın işe yaramasının nedeni şu:
UI partial JSON ile bile anlamlı şekilde render olabiliyor.
-->
---
hideInToc: true
---

# Adaptive UIs — takeaways

<div grid="~ cols-2 gap-6" class="mt-4">

<div>

### What stuck with me

- **Speed is the product** — he benchmarked models live; the fastest
  answered in ~1.3s, the smartest took 16s. For UI-on-demand, fast wins.
- **"Be humble"** — his favorite idea (YAML, "because it streams") got
  *praised* by the AI… then real measurements showed plain JSON was
  faster. Measure, don't trust flattery.
- Components stay deterministic — the AI only *composes* them, so a
  hallucinating model can't break the brand or the security model.
- Partial answers are repaired on the fly (`jsonrepair`), so the screen
  is never blank while the AI thinks.

</div>

<div>

### What to try at work

- Clone the demo repo and run it locally
- Identify 1–2 screens where "ask a question, get a dashboard"
  beats navigating menus
- Draft our "approved block" list — which action-kit components
  would the AI be allowed to use?
- Read through the slides as a team

</div>

</div>

<div class="mt-4 text-sm opacity-70">
  📊 <a href="https://talk-adaptive-uis-madvue-2026.oberlehner.work/1" target="_blank">Slides</a>
  &nbsp;·&nbsp;
  💻 <a href="https://code.oberlehner.work/markus/talk-adaptive-uis-madvue-2026-demo" target="_blank">Demo repo</a>
</div>

<!--
Aklımda kalanlar: birincisi, hız ürünün kendisi. Markus sahnede model
benchmark'ları gösterdi — en hızlı model bir saniye küsurda cevap veriyor, en
akıllısı on altı saniyede. Anında ekran kurmak istiyorsanız hızlı olan
kazanıyor. İkincisi, "Be humble" hikayesi: kendi parlak fikri YAML'dı, "çünkü
güzel stream ediyor" diye. AI da fikrini övmüş. Sonra gerçek ölçüm yapınca düz
JSON'un daha hızlı olduğu çıkmış. Ders: övgüye değil ölçüme güven. Üçüncüsü,
component'ler deterministik kalıyor — AI sadece kompozisyon yapıyor, yani
halüsinasyon gören bir model bile markayı veya güvenliği bozamıyor.
Dördüncüsü, yarım cevaplar jsonrepair ile anında onarılıyor — AI düşünürken
ekran asla boş kalmıyor.

Denemek için: demo repo'yu çalıştırmak, "menülerde gezinmek yerine soru sor,
dashboard al" yaklaşımının işe yarayacağı bir-iki ekran bulmak ve bizim onaylı
blok listemizi taslaklamak — action-kit'ten AI'a hangi component'leri açardık?
-->
---
layout: section
---

# Clean Code Is Sexy Again

Making your Vue project AI-ready · Alexander Opalic

<!--
Dördüncü konuşma Alexander Opalic'ten. Başlık biraz yanıltıcı: aslında AI
hakkında değil, AI'ı işe yarar kılan proje hijyeni hakkında.
-->

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Clean Code Is Sexy Again

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="'/img/alexander-opalic.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Alexander Opalic">
  <span><strong>Alexander Opalic</strong> · 16:15</span>
</div>

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs my-2">
💡 <strong>In plain terms:</strong> AI coding assistants are only as good as
the project you point them at. A tidy, well-documented codebase makes them
dramatically more effective — clean code became a productivity multiplier.
</div>

Framing: Bun (a major JS tool) was partially rewritten with heavy
AI-agent help. "You don't have to write code anymore" is half true —
*only* if the project is built for AI.

His mental model:

- An AI agent is just a loop: a model + tools + a working memory
- The model can't see your running app — only what you describe to it
- That working memory is finite — agents work best when it's **not
  full** of irrelevant docs

</div>

::right::

<div class="rounded border border-white/10 p-4 text-sm">

### 🔗 Resources

- 📊 Slides
  <div class="opacity-70 text-xs break-all">
    <a href="https://alexanderop.github.io/vue-mad-26/" target="_blank">
      alexanderop.github.io/vue-mad-26
    </a>
  </div>

- 💻 Deck source
  <div class="opacity-70 text-xs break-all">
    <a href="https://github.com/alexanderop/vue-mad-26" target="_blank">
      github.com/alexanderop/vue-mad-26
    </a>
  </div>

</div>

<div class="text-xs opacity-60 mt-3">
  Punchline at the end: "this talk wasn't about AI" — it's about
  the project hygiene that makes AI useful.
</div>

<!--
Alexander şöyle açıyor: Bun'ın bir kısmı agent yardımıyla Rust'a yeniden
yazıldı. "Artık kod yazmaya gerek yok" cümlesi yarı doğru — eğer proje AI'a
hazırsa ve geliştiriciler ne yaptığını biliyorsa. Düşünme modeli şöyle: agent
dediğin bir döngü, model, tool'lar ve context'ten ibaret. Context window dolu
olmadığında çok daha iyi çalışıyor. Slaytları ve repo'su açık, kendi internal
pipeline'larımız için harika bir referans.
-->
---
hideInToc: true
---

# Clean Code — there's no magic in an "AI agent"

<div class="text-xs op-70 mb-2">
  Alexander demystified the whole thing in two snippets — an agent is small enough
  to fit on half a slide:
</div>

<div grid="~ cols-2 gap-6">

<div>

<div class="text-xs op-70 mb-1">A "tool" = something the AI may do, described in 3 fields:</div>

```ts
type Tool = {
  description: string   // what it does (the AI reads this)
  schema: ...           // what inputs it needs
  execute: ...          // the actual action it performs
}
```

<div class="text-xs op-70 mt-3 mb-1">And the "agent" = ask the model, run what it asked for, repeat until it stops:</div>

```ts
const loop = async (msgs) => {
  const r = await callApi(msgs)   // 1. ask the model
  const t = await runTools(r)     // 2. do what it asked
  return t.length
    ? loop([...msgs, r, t])       // 3. something happened? go again
    : msgs                        //    nothing left to do? done
}
```

</div>

<div>

<div class="text-xs op-70 mb-1">The real lesson — the AI's instruction file, before → after:</div>

````md magic-move {lines: false}
```md
# AGENTS.md — 2,000 lines 😵
## Code Style    (200 lines)
## Architecture  (150 lines)
## Gotchas      (300 lines)
## Testing      (100 lines)
→ half the AI's working memory is
  gone before it reads your request
```
```md
# AGENTS.md — ~50 lines ✨
Run `pnpm lint:fix && pnpm typecheck`.

## Stack
Nuxt 4, @nuxt/ui v3

## Further reading        ← a doorway:
- docs/nuxt-gotchas.md      points at docs
- docs/testing.md           instead of
                            repeating them
```
````

<div class="text-xs op-70 mt-3 mb-1">…plus one small automation: every session <em>starts</em> with the project's memory loaded:</div>

```json
{ "hooks": { "SessionStart": [{          // "when a session starts…
  "command": ".claude/hooks/inject-brain.sh"
}]}}                                      //  …load brain/ first" — that's it
```

</div>
</div>

<div class="mt-3 text-xs opacity-60">
  Snippets from <a href="https://github.com/alexanderop/vue-mad-26" target="_blank">alexanderop/vue-mad-26</a>
</div>

<!--
Alexander'ın üç kod parçası şöyle. Birincisi: tool dediğin aslında bir fonksiyon
— üç field var, hepsi bu. İkincisi: agent loop bir recursion — model'i
çağırıyorsun, tool'ları çalıştırıyorsun, sonuç döndüyse loop devam ediyor.
Üçüncüsü: SessionStart hook'u brain/index.md'i context'e enjekte ediyor — altı
satır shell. Setup'ı işler kılan asıl sır bu son parça.
-->
---
hideInToc: true
---

# Clean Code — takeaways

<div grid="~ cols-2 gap-6" class="mt-4">

<div>

### Concrete pieces of his setup

- `AGENTS.md` as a doorway, not a dump
- A `brain/` folder ("brainmaxxing") with **Codebase**, **Plans**, **Principles**
- Skills = recipes the agent opens on a trigger
- Hooks fire around agent events (e.g. brain-extract on turn end)
- Quality pipeline in layers: types → lint/format → unit → component → `agent-browser`
- Lefthook as the commit-time gate

</div>

<div>

### What to try at work

- Start an `AGENTS.md` that points at our existing docs
- Pick 3–5 principles the agent should *always* follow (e.g. "Boundary Discipline")
- Add `agent-browser` to one app and let the agent reproduce a real bug
- Reconsider flat `src/` layout vs. feature-sliced for AI-readability
- Treat agent mistakes as **factory problems, not PR problems**

</div>

</div>

<div class="mt-8 text-sm opacity-70">
  📊 <a href="https://alexanderop.github.io/vue-mad-26/" target="_blank">Slides</a>
  &nbsp;·&nbsp;
  💻 <a href="https://github.com/alexanderop/vue-mad-26" target="_blank">Repo</a>
</div>

<!--
İki taraflı bir yaklaşım var. Somut setup parçaları olarak: AGENTS.md bir
"doorway" olarak tutuluyor, içine her şeyi tıkmak yerine ana yerlere
yönlendiriyor. brain/ klasöründe Codebase, Plans ve Principles var. Skills,
hooks ve katmanlı bir kalite pipeline'ı: types → lint → unit → component →
agent-browser. Lefthook commit-time gate görevi görüyor. Bizde
deneyebileceklerimiz: AGENTS.md başlatmak, üç-beş prensip seçmek ("Boundary
Discipline" gibi), bir uygulamaya agent-browser eklemek. Ana mesaj akılda
kalsın: "Fabrikayı düzelt, PR'ı değil" — agent yanılıyorsa hata genellikle
PR'da değil, kural setinde, context'te veya pipeline'da.
-->
---
hideInToc: true
---

# Clean Code — our state

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs mb-3">
🎯 <strong>Where we stand:</strong> each repo has <em>half</em> of Alexander's
setup — and conveniently, the opposite half. We just need to swap strengths.
</div>

<div grid="~ cols-2 gap-x-6 gap-y-4" class="text-sm">

<div>

<div class="text-xs op-60 mb-1">📍 search-ads-ui — has the AI guide, misses the safety net</div>

- ✓ Has a **written AI guide**: how the project is organized, which
  patterns to use, what limits to respect — AI assistants start
  well-informed.
- ✓ **Already tried from this talk:** Alexander's `brain/` setup is
  now applied here — curated project knowledge the AI loads each
  session instead of rediscovering everything.
  developer's machine; problems surface later.

</div>

<div>

<div class="text-xs op-60 mb-1">📍 action-kit — has the safety net, misses the AI guide</div>

- ✓ **Pre-commit checks active** — code is auto-checked and auto-fixed
  the moment you try to commit.
- ✓ Heavily tested (130 test files).


</div>

</div>

<div class="mt-4 text-xs op-70">
  <span class="opacity-60">Next:</span>
  swap strengths — copy action-kit's pre-commit setup into search-ads-ui, and write a
  short "doorway" AI guide for action-kit (~50 lines pointing at the docs that already
  exist — per Alexander: a doorway, not a dump).
</div>

<!--
Tek cümlelik özet: iki repomuzun her biri Alexander'ın setup'ının yarısına sahip
— ve şanslıyız ki tam ters yarılarına. Yapmamız gereken güçlü yanları takas etmek.

Search-ads-ui'da yazılı bir AI rehberi var — proje nasıl organize edilmiş,
hangi pattern'lar kullanılıyor, hangi limitlere uyuluyor. Yani bir AI asistanı
bu repoda işe bilgili başlıyor. Üstüne taze bir haber: Alexander'ın brain/
yaklaşımını konferanstan döner dönmez search-ads-ui'da uyguladım — AI her
oturumda projeyi sıfırdan keşfetmek yerine derlenmiş proje bilgisini yükleyerek
başlıyor. İlk izlenimleri ayrıca paylaşacağım. Eksik olan güvenlik ağı:
pre-commit kontrolü yok, hatalı commit geliştiricinin makinesinde
durdurulmuyor, sorun daha geç ortaya çıkıyor.

Action-kit'te durum tam tersi: pre-commit kontrolleri aktif — commit etmeye
çalıştığınız anda kod otomatik kontrol edilip düzeltiliyor. Library çok iyi test
edilmiş. Ama AI rehberi yok — bu repoya bırakılan bir AI asistanı her seferinde
her şeyi sıfırdan keşfetmek zorunda.

Bir sonraki adım: güçlü yanları takas edelim. Action-kit'in pre-commit setup'ını
search-ads-ui'a kopyalayalım; action-kit için de elli satırlık kısa bir
"doorway" AGENTS.md yazalım — Alexander'ın deyişiyle kapı olsun, çöplük değil.
Mevcut storybook ve skills dökümanlarına işaret etmesi yeterli.
-->
---
layout: section
---

# A New Model for Form Components

Abdelrahman Awad

<!--
Beşinci konuşma vee-validate'in yazarı Abdelrahman Awad'dan. Şu anda Sentry'de
Senior Engineer olarak çalışıyor. Konu form component'lerinin yeniden
tasarlanması. Bu konuşmanın büyük bir teması accessibility — önce onu herkes
için bir slaytta açalım.
-->

---
hideInToc: true
---

# First — what is accessibility (and "ARIA")?

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs mb-3">
  <strong>Accessibility (a11y)</strong> = the app works for <em>everyone</em>:
  people using <strong>screen readers</strong> (software that reads the screen
  aloud), people navigating by <strong>keyboard only</strong>, people with low
  vision. Since 2025 it's also a <strong>legal requirement in the EU</strong> —
  not a nice-to-have.
</div>

<div grid="~ cols-2 gap-4" class="text-sm">

<div>

<div class="text-xs op-60 mb-1">The catch: a screen reader can only say what the code tells it</div>

A bare input field, read aloud:

<div class="rounded border border-red-400/30 p-2 text-xs font-mono my-2">🔊 "edit text"</div>

That's *all* a blind user learns. Which field? Required?
Is something wrong with it? No idea.

</div>

<div>

<div class="text-xs op-60 mb-1"><strong>ARIA</strong> = standard labels that tell assistive tech what things are & what state they're in</div>

The same field, properly wired (`aria-required`, `aria-invalid`, …):

<div class="rounded border border-teal-400/30 p-2 text-xs font-mono my-2">🔊 "Work email — edit text — required —
invalid entry — Please fill out this field"</div>

Now the user knows exactly where they are and what to fix.

</div>

</div>

<div class="mt-4 text-xs op-70">
  The problem Awad attacks: this wiring must be repeated on <strong>every field of
  every form</strong>, by hand — tedious and easy to forget. His answer: the field's
  "brain" should <strong>produce it automatically</strong>. (You'll see it live in
  a minute — the right panel of the demo.)
</div>

<!--
Awad'ın konusuna girmeden önce iki terimi açalım: accessibility ve ARIA.

Accessibility, yani erişilebilirlik: uygulamanın herkes için çalışması.
Ekran okuyucu kullananlar — yani ekranı sesli okuyan yazılımla gezen görme
engelli kullanıcılar — sadece klavyeyle gezinenler, az görenler. 2025'ten beri
AB'de yasal zorunluluk; "olsa iyi olur" kategorisinden çıktı.

İşin püf noktası şu: ekran okuyucu sadece kodun ona söylediğini söyleyebilir.
Düz bir input alanını sesli okuyunca kullanıcının duyduğu tek şey: "edit text".
Hangi alan? Zorunlu mu? Hata mı var? Hiçbir fikri yok.

ARIA da tam bunun standardı: elemanların ne olduğunu ve hangi durumda olduğunu
yardımcı teknolojilere söyleyen etiketler. Aynı alan doğru etiketlenince
kullanıcının duyduğu: "Work email — edit text — required — invalid entry —
Please fill out this field." Artık nerede olduğunu ve neyi düzelteceğini
biliyor.

Awad'ın saldırdığı problem şu: bu etiketleme her formun her alanında elle
tekrarlanmak zorunda — sıkıcı ve unutması çok kolay. Cevabı: alanın "beyni"
bunu otomatik üretsin. Birazdan demoda canlı göreceğiz — sağ paneldeki
attribute listesi tam olarak bu.
-->
---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# A New Model for Form Components

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="'/img/abdelrahman-awad.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Abdelrahman Awad">
  <span><strong>Abdelrahman Awad</strong> — Sentry · author of vee-validate · 18:10</span>
</div>

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs my-2">
💡 <strong>In plain terms:</strong> forms (sign-up, settings, invites) look
simple but hide enormous work — validation, error messages, translations,
keyboard & screen-reader support. Every existing approach solves
<em>some</em> of it and dumps the rest on the team.
</div>

Thesis — every form approach leaves something on the floor:

- **Validation libraries** — checking solved; looks, a11y, i18n on you
- **UI kits** — pretty, but behavior is locked in
- **"Headless" libraries** — still sneak markup assumptions in

His answer (**formwerk**): one "brain" per field owning **behavior,
state, translations, accessibility** — handing you ready attribute
bundles for markup *you* fully control.

</div>

::right::

<div class="rounded border border-white/10 p-4 text-sm">

### 🔗 Resources

- 📺 Official recording (31:40)
  <div class="opacity-70 text-xs break-all">
    <a href="https://www.youtube.com/watch?v=AzficBvu02Y" target="_blank">
      youtube.com/watch?v=AzficBvu02Y
    </a>
  </div>

- 📊 Slides (this talk)
  <div class="opacity-70 text-xs break-all">
    <a href="https://awad.dev/talks/a-new-model-for-form-components/1" target="_blank">
      awad.dev/talks/a-new-model-for-form-components
    </a>
  </div>

- 🌐 Library
  <div class="opacity-70 text-xs break-all">
    <a href="https://formwerk.dev" target="_blank">formwerk.dev</a>
  </div>

- 👤 Speaker
  <div class="opacity-70 text-xs break-all">
    <a href="https://awad.dev" target="_blank">awad.dev</a> ·
    <a href="https://bsky.app/profile/awad.dev" target="_blank">@awad.dev</a> ·
    <a href="https://x.com/logaretm" target="_blank">@logaretm</a>
  </div>

- 📅 Conference page
  <div class="opacity-70 text-xs break-all">
    <a href="https://madvue.es/2026-edition/talks/abdelrahman-awad" target="_blank">
      madvue.es/2026-edition/talks/abdelrahman-awad
    </a>
  </div>

</div>

<!--
Awad'ın tezi şu: mevcut her form yaklaşımı bir şeyi geride bırakıyor. Pure
validator'lar schema'yı çözüyor ama markup, accessibility ve i18n sende kalıyor.
UI kit'ler güzel görünüyor ama davranış kilitli, customize ederken kütüphane
ile savaşıyorsun. Schema builder'lar DSL'i terk ettiğin anda dünyayı yeniden
inşa ediyorsun. "Headless" denilen kütüphaneler bile markup varsayımlarını
sızdırıyor — yani gerçekten headless değiller. Onun cevabı şu: tek bir
useField(props) beyni — davranış, state, i18n ve accessibility'yi bir arada
yönetiyor, sana spread edeceğin prop bundle'ları veriyor, markup'ı sen
yazıyorsun. Lafı uzatmadan canlı görelim.
-->
---
hideInToc: true
---

# Form components — live demo

<div class="text-xs op-60 mb-3">
  Not a mockup — this slide runs the actual <strong>formwerk</strong> library.
  The input is plain HTML we styled ourselves; formwerk provides everything else.
</div>

<DemoFormwerk />

<div class="mt-3 text-xs op-50">
  The whole date picker — segments, calendar grid, month/year drill-down (click the
  title), arrow-key navigation, locale formatting — is <code>useDateField()</code> +
  <code>useCalendar()</code> on markup we own. We styled it; formwerk does the rest.
</div>

<!--
Bu slayt mockup değil — gerçekten formwerk çalıştırıyor, deck'in içine
kütüphaneyi kurdum. Solda text field: bir şeyler yazın, silin — validation,
hata mesajı ve altta canlı güncellenen bütün aria-* attribute'ları tek bir
useTextField() çağrısından geliyor.

Sağda ise tam bir date picker — Awad'ın deck'indeki örneğin aynısı. Üstte
segment'li input, altında takvim grid'i; ikisi aynı field'a bağlı: takvimde
bir güne tıklayın, segment'ler güncelleniyor; segment'i ok tuşuyla değiştirin,
takvim seçimi kayıyor. Takvimin başlığına tıklarsanız ay görünümüne, bir daha
tıklarsanız yıl görünümüne iniyor — hepsi klavyeyle de geziliyor. Locale
butonlarına basın: en-US, tr-TR, ar-EG — segment sırası, ay isimleri, hatta
rakamlar bile değişiyor ve değer her zaman gerçek bir Date objesi. Bütün bunlar
useDateField() + useCalendar() ve bizim kendi markup'ımız. Awad'ın "davranış,
state, i18n ve ARIA tek beyinden çıkar" dediği şeyin canlı hali.
-->
---
hideInToc: true
---

# Form components — one pattern, every field

<div class="text-xs op-70 mb-2">
  The whole library is one move, repeated: <strong>call the "brain", get labeled
  bags of attributes back, put them on your own HTML.</strong>
</div>

<div grid="~ cols-2 gap-6">

<div>

<div class="text-xs op-70 mb-1">A text field — one call in, four ready-made bags out:</div>

```ts
const {
  inputProps,          // ← everything the <input> needs
  labelProps,          // ← everything the <label> needs
  errorMessage,        // ← the message, already translated
  errorMessageProps,   // ← wiring so screen readers find it
} = useTextField(props)
```

<div class="text-xs op-70 mt-3 mb-1">A whole calendar — same move, just more bags:</div>

```ts
const {
  calendarProps, gridProps,        // the calendar + day grid
  nextButtonProps,                 // ‹ › month buttons
  gridLabel, currentView,          // "June 2026", weeks/months
} = useCalendar(props)
```

</div>

<div>

<div class="text-xs op-70 mb-1">What's <em>inside</em> a bag? All the accessibility you never have to remember:</div>

```ts
inputProps == {
  'aria-invalid':   hasError,   // screen reader: "this field has an error"
  'aria-describedby': errorId,  // …"and the error text is over here"
  'aria-required':  required,   // …"and it's mandatory"
  role: 'combobox', // …"and it behaves like a dropdown"
}
```

<div class="text-xs op-70 mt-3 mb-1">And when fields appear/disappear mid-edit, the form <em>watches</em> instead of asking — duplicate changes get merged, stale ones dropped:</div>

```text
same instant:  field removed → re-added → list edited
next instant:  sorted, deduplicated, applied cleanly
```

</div>
</div>

<div class="mt-3 text-xs opacity-60">
  Same <code>useField</code> shape works for calendars (Gregorian → Islamic
  by changing the calendar prop), file inputs with dropzones, sliders,
  OTP — the docs at <a href="https://formwerk.dev" target="_blank">formwerk.dev</a>
  cover all of them.
</div>

<!--
Burada kod var. Solda useTextField ve useCalendar hook'larının döndürdüğü prop
bundle'ları görüyorsunuz. Calendar'da sadece prop değiştirerek Gregorian'dan
Hijri'ye geçiyorsun, ekstra hiçbir şey yok. Sağda ARIA'nın bir output olduğunu,
contract olmadığını gösteriyor — inputProps zaten aria-labelledby,
aria-describedby, aria-invalid, aria-required ve role: 'combobox' içeriyor.
En altta form transaction log'u var — tek bir tick'te birden çok değişim oluyor,
sonraki tick'te sıralanmış, deduped ve uygulanmış olarak çıkıyor. UNSET INIT'ten
önce gelirse stale operation siliniyor.
-->
---
hideInToc: true
---

# Form components — takeaways

<div grid="~ cols-2 gap-6" class="mt-4">

<div>

### What's new

- `useField(props)` owns four concerns: **behavior, state, i18n, accessibility**
- Emits prop bundles (`controlProps`, `labelProps`, `errorProps`) you spread onto your own markup
- Composable all the way down — `useNumberField` = `useSpinButton` + `useNumberParser` + `useInputValidity` + `useLocale`
- **Form transactions** — field changes become typed, queued, deduped ops applied next tick
- Same model across every field — Text, ComboBox, Calendar, File, OTP, Slider, …

</div>

<div>

### What to try at work

- Read the form-transaction model on [formwerk.dev](https://formwerk.dev) before our refactor
- Audit one form with `v-if` fields — replace mount/unmount validation hacks with transactions
- Treat ARIA as an **output** (props you spread), not a checklist per component
- Pull `useLocale` / `useNumberParser` patterns into our own primitives even if we don't adopt the library wholesale

</div>

</div>

<!--
Dört ana çıkarım var. Birincisi: useField(props) dört konuyu birden yönetiyor
— davranış (klavye, focus, pointer), state (value, touched, dirty, errors),
i18n (RTL, locale numbers, calendars) ve accessibility (ARIA prop'lara otomatik
gömülü geliyor). İkincisi: controlProps, labelProps, errorProps bundle'larını
sen kendi template'ine spread ediyorsun — kütüphane sana wrapper element
dayatmıyor. Üçüncüsü: model en alta kadar composable — useNumberField aslında
useSpinButton + useNumberParser + useInputValidity + useLocale'in birleşimi.
Dördüncüsü ve en güzeli: form transactions — bir alan kaybolduğunda form
sebebini sormuyor, her değişikliği queued ve dedupe edilmiş typed event olarak
observe ediyor. Awad bunu vee-validate'le geçirdiği yıllardan çıkmış bir ders
olarak anlatıyor.
-->
---
hideInToc: true
---

# Form components — our state

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs mb-3">
🎯 <strong>Where we stand:</strong> we already build every form with Awad's
<em>previous</em> library (vee-validate) — and our component library's v2 form
components were already drifting toward his new model without us knowing it.
</div>

<div grid="~ cols-2 gap-x-6 gap-y-4" class="text-sm">

<div>

<div class="text-xs op-60 mb-1">📍 search-ads-ui — our hardest forms are the exact target</div>

Our most complex forms are *exactly* the kind formwerk is built for:

- **Fields that appear conditionally** — required only in certain cases
- **Lists of repeating entries**, each with its own validation
- **Translated error messages** in every language we ship

Today every form hand-wires all of this, separately, itself.

</div>

<div>

<div class="text-xs op-60 mb-1">📍 action-kit — accidentally halfway there</div>

Our v2 form components (`MaForm2`/`MaFormItem2`) are already "headless":
they draw the form but deliberately contain **no validation logic**.

That's the same separation Awad argues for — adding a formwerk-style
"field brain" layer would take roughly **5 small files**.

</div>

</div>

<div class="mt-4 text-xs op-70">
  <span class="opacity-60">Next:</span>
  prototype <strong>formwerk</strong> on one of our most complex forms — one that triggers
  every pain point (lists, conditional fields, translations, accessibility). If it lands
  well, move the primitives into action-kit so every app benefits.
</div>

<!--
Tek cümlelik özet: zaten bütün formlarımızı Awad'ın bir önceki kütüphanesiyle
(vee-validate) yazıyoruz — ve action-kit'in v2 form component'leri farkında
olmadan onun yeni modeline doğru kaymış durumda.

Search-ads-ui'daki en karmaşık formlarımız formwerk'in tam hedeflediği türden:
sadece belirli durumlarda zorunlu hale gelen koşullu alanlar, her satırı kendi
kuralına göre doğrulanan tekrar eden listeler ve her dilde çevrilmiş hata
mesajları. Bugün her form bunların hepsini ayrı ayrı, elle bağlıyor.

Action-kit tarafında güzel bir sürpriz var: v2 form component'lerimiz zaten
"headless" — formu çiziyorlar ama bilinçli olarak hiç validation logic
içermiyorlar. Bu, Awad'ın savunduğu ayrımın ta kendisi. Üstüne formwerk tarzı
bir "field brain" katmanı eklemek yaklaşık beş küçük dosya demek.

Bir sonraki adım: formwerk'i MMP goal formu üzerinde prototipleyelim — bütün
pain point'leri tetikliyor: listeler, koşullu alanlar, çeviriler, accessibility.
İyi sonuç verirse primitive'leri action-kit'e taşırız, bütün uygulamalar
faydalanır.
-->
---
layout: section
---

# Vue Real-Time Apps

Nico Devs · 09:30

<!--
Altıncı ve son konuşma Nico Devs'ten, Tighten'da Lead Programmer. Konu real-time
uygulamalar için pratik bir tur.
-->
---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Vue Real-Time Apps

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="'/img/nico-devs.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Nico Devs">
  <span><strong>Nico Devs</strong> — Lead Programmer at Tighten · 09:30</span>
</div>

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs my-2">
💡 <strong>In plain terms:</strong> how apps show live updates without you
hitting refresh — from "check again every minute" up to "instant push".
Each step up buys capability at the cost of complexity.
</div>

The realtime ladder, lightest to heaviest:

- **Polling** — "anything new?" asked again and again; never truly live
- **SSE** (Server-Sent Events) — a **radio broadcast**: tune in once,
  the server pushes updates as they happen. One-way — listen, don't
  talk back.
- **WebSockets** — a **phone call**: both sides talk anytime (chat,
  live collaboration)
- **WebRTC** — browsers connect **directly**, no server in between —
  what Zoom-style calls run on. <span class="op-60">Not our use case.</span>
- **Local-First + CRDTs** — works offline, syncs when back

</div>

::right::

<div class="rounded border border-white/10 p-4 text-sm">

### 🔗 Resources

- 📺 Official recording (32:27)
  <div class="opacity-70 text-xs break-all">
    <a href="https://www.youtube.com/watch?v=w0Nt-G9k1lg" target="_blank">
      youtube.com/watch?v=w0Nt-G9k1lg
    </a>
  </div>

- 🎞 Slides
  <div class="opacity-70 text-xs break-all">
    <a href="https://nicodevs.com/slides/madvue/" target="_blank">
      nicodevs.com/slides/madvue
    </a>
  </div>

- 👤 Speaker
  <div class="opacity-70 text-xs break-all">
    <a href="https://nicodevs.com" target="_blank">nicodevs.com</a> ·
    @nicodevs
  </div>

</div>

<div class="mt-3">
  <img :src="'/img/nico-beers.webp'" class="rounded-lg border border-white/15 w-full h-44 object-cover" alt="Post-conference beers with Nico">
  <div class="text-[10px] op-50 mt-1 text-center">Neco baba ve bizzo</div>
</div>

<!--
Nico'nun yapısı şu: ihtiyacın büyüdükçe stack'in de karmaşıklaşıyor. Birkaç
terimi herkes için açayım — derine inmeyeceğim çünkü çoğu bizim dünyamızda yok:

Polling: "yeni bir şey var mı?" diye tekrar tekrar sormak. Basit ama hiçbir
zaman gerçekten canlı değil.

SSE, yani Server-Sent Events: radyo yayını gibi. Bir kere kanalı açıyorsunuz,
sunucu ne zaman yeni bir şey olursa size gönderiyor, bir daha sormuyorsunuz.
Tek yönlü — dinliyorsunuz, cevap veremiyorsunuz. Ask AI chatbot'umuz tam
olarak böyle çalışıyor.

WebSocket: telefon görüşmesi gibi — iki taraf da istediği an konuşabiliyor.
Chat ve ortak çalışma için.

WebRTC: iki tarayıcının ortada sunucu olmadan doğrudan birbirine bağlanması —
Zoom ve Meet tarzı görüntülü aramaların altyapısı bu. Video ve gizlilik için
harika ama bizim kullanım alanımız değil, o yüzden detayına girmiyorum.

Local-First ve CRDT'ler: veri cihazda yaşıyor, internet yokken de çalışıyor,
bağlantı gelince çakışmasız birleşiyor.

Her adım karmaşıklığı yeni bir özellikle değiş tokuş ediyor. Bizi ilgilendiren
ilk iki basamak — farkı canlı görelim.

Sağ alttaki fotoğraf: konuşma sonrası Nico ve ekiple — peer-to-peer bağlantı
kurulmuştur.
-->

---
hideInToc: true
---

# Real-Time — live demo

<div class="text-xs op-60 mb-3">
  Polling vs. streaming, side by side — same data source, very different freshness:
</div>

<DemoRealtime />

<div class="mt-4 text-xs op-50">
  The left card is how our dashboards behave today (re-ask every few seconds, stale in
  between). The right card is the SSE technique.
</div>

<!--
İki kart da aynı veri kaynağına bakıyor. Soldaki bizim dashboard'larımızın
bugünkü davranışı: birkaç saniyede bir sunucuya tekrar soruyor, aradaki sürede
veri bayat — sarı uyarıya dikkat, gerçek değerle gösterilen değer ayrışıyor ve
istek sayacı sürekli artıyor. Sağdaki ise chatbot'umuzun zaten kullandığı SSE
tekniği: tek bir açık bağlantı, veri her an güncel, sıfır tekrar isteği.
Nico'nun "polling hiçbir zaman gerçekten real-time değildir" cümlesinin canlı
hali.
-->

---
hideInToc: true
---

# Real-Time — takeaways

<div class="text-xs op-70 mb-2">
  Nico's rule: <strong>climb the ladder only as far as you must</strong> —
  and notice how little code each rung costs:
</div>

<div grid="~ cols-2 gap-x-6 gap-y-4" class="text-sm">

<div>

<div class="text-xs op-70 mb-1">① "The server pushes news to me" (one-way) — <strong>one line</strong>:</div>

```ts
const { data } = useEventSource('/api/stream')
// data updates by itself; reconnects by itself;
// replays anything missed while offline
```

</div>

<div>

<div class="text-xs op-70 mb-1">② "We both talk, instantly" (chat, collab) — <strong>one line + options</strong>:</div>

```ts
const { data, send } = useWebSocket(url, {
  autoReconnect: true,                    // drops? comes back
  heartbeat: { interval: 30_000 },        // "still alive?" ping
})
```

</div>

<div>

<div class="text-xs op-70 mb-1">③ "Browsers talk <em>directly</em>" (calls, screen share):</div>

```text
PeerJS hides the scary setup of WebRTC.
Why bother: lower delay, private by default,
and no server bandwidth bill at all.
```

</div>

<div>

<div class="text-xs op-70 mb-1">④ "Works on a plane" — data lives on the device:</div>

```text
read & write locally → instant, even offline
reconnect → changes merge without conflicts (CRDTs)
```

</div>

</div>

<div class="mt-4 text-xs opacity-60">
  🎞 Slides:
  <a href="https://nicodevs.com/slides/madvue/" target="_blank">nicodevs.com/slides/madvue</a>
</div>

<!--
Dört tane primitive var, prensip şu: en hafif olanı seç ve onunla başla. SSE
için useEventSource('/api/stream') ile başlıyorsun, otomatik reconnect retry
ms sonra çalışıyor, Last-Event-ID header'ı kaçırılan event'leri replay ediyor.
WebSocket için useWebSocket autoReconnect ve heartbeat opsiyonlarıyla geliyor.
WebRTC PeerJS sayesinde SDP boilerplate'i olmadan kullanılıyor — gizlilik
default olarak E2E, bandwidth faturası yok. Local-first'te data cihazda
yaşıyor, CRDT'ler conflict-free merge sağlıyor.
-->
---
layout: section
---

# Beyond Nuxt 4

Daniel Roe · Nuxt team lead

<!--
Yedinci konuşma Nuxt ekibinin lideri Daniel Roe'dan. Biz Nuxt kullanmıyoruz ama
bu konuşma önemli: Vue ekosisteminin geleceği önce Nuxt'ta şekilleniyor. Önce
Nuxt nedir, Next.js ile karışıklığı da gidererek bir slaytta açıklayalım.
-->
---
hideInToc: true
---

# First — what is Nuxt? (and is it Next.js?)

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs mb-3">
  Vue gives you the <strong>building blocks</strong> for screens. <strong>Nuxt</strong> is the
  framework built on top of it that handles <em>everything around</em> them — pages
  & URLs, loading fast, search-engine visibility, where the server bits go.
  Blocks vs. the whole house plan.
</div>

<div grid="~ cols-2 gap-6" class="text-sm">

<div>

<div class="text-xs op-60 mb-1">You've probably heard of Next.js — same idea, different family:</div>

| ecosystem | UI library | "batteries-included" framework |
| --- | --- | --- |
| React (Meta) | React | **Next.js** |
| Vue (Evan You) | Vue | **Nuxt** |

<div class="text-xs op-60 mt-2">
  Next.js is more famous simply because React is more widespread — but they
  play the <strong>exact same role</strong>. Even the name is a deliberate wink:
  Nuxt arrived in 2016, right after Next.
</div>

</div>

<div>

<div class="text-xs op-60 mb-1">When does a team pick Nuxt (or Next)?</div>

- The site must be **found by Google** and **load instantly** — pages
  are rendered on the server (online shops, news, landing pages)
- You want routing, data fetching and deployment **decided for you**

<div class="text-xs op-60 mt-3 mb-1">And us?</div>

- We build **dashboards behind a login** — no search engines, no
  public pages. Plain Vue + Vite is the lighter, right-sized choice.

</div>

</div>

<!--
Daniel'ın konuşmasına girmeden önce: Nuxt nedir? Ve çok duyduğunuz Next.js
ile aynı şey mi?

Vue size ekran kurmak için yapı taşlarını verir. Nuxt ise onun üstüne kurulu
framework — ekranların etrafındaki her şeyi halleder: sayfalar ve URL'ler,
hızlı yüklenme, Google'da görünürlük, sunucu tarafı işler. Yapı taşları ile
komple ev planı farkı.

Next.js meselesi basit: aynı fikrin React ailesindeki karşılığı. React
tarafında React + Next.js, Vue tarafında Vue + Nuxt. Next.js daha meşhur
çünkü React daha yaygın — ama rolleri birebir aynı. İsim bile bilinçli bir
göz kırpma: Nuxt 2016'da, Next'ten hemen sonra çıktı.

Ne zaman Nuxt veya Next seçilir? Sitenin Google'da bulunması ve anında
yüklenmesi gerekiyorsa — yani sayfalar sunucuda render ediliyorsa: e-ticaret,
haber siteleri, landing page'ler. Bir de routing, veri çekme, deployment gibi
kararların sizin yerinize verilmesini istiyorsanız.

Biz ise login arkasında dashboard yapıyoruz — arama motoru yok, halka açık
sayfa yok. Düz Vue + Vite bizim için daha hafif ve doğru boyutta bir seçim.
Ama Daniel'ın anlatacakları yine de bizi ilgilendiriyor — birazdan göreceğiz.
-->
---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Beyond Nuxt 4

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="'/img/daniel-roe.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Daniel Roe">
  <span><strong>Daniel Roe</strong> — Nuxt team lead</span>
</div>

<div class="rounded bg-white/5 border border-white/10 p-2 text-xs my-2">
💡 <strong>In plain terms:</strong> Nuxt is the most popular "batteries-included"
framework for building Vue apps. We don't use it — but the Vue ecosystem's
future ships there first, so its roadmap is a preview of ours.
</div>

A roadmap talk in two halves:

- **Nuxt 4.5** (shipping soon) — a focused minor: named views,
  per-environment config, faster preloading, first-class desktop
  support, big memory fixes for huge sites
- **Nuxt 5** (rolling out over the next year) — rebuilt on **Vite 8**;
  "**progressive JS**": the compiler picks the cheapest rendering mode
  per component; lighter by default; typed *everything* — pages, params,
  and server calls share one type graph

</div>

::right::

<div class="rounded border border-white/10 p-4 text-sm">

### 🔗 Resources

- 📺 Official recording (49:36)
  <div class="opacity-70 text-xs break-all">
    <a href="https://www.youtube.com/watch?v=42VokCeb0ZQ" target="_blank">
      youtube.com/watch?v=42VokCeb0ZQ
    </a>
  </div>

- 📊 Slides (this talk, PDF)
  <div class="opacity-70 text-xs break-all">
    <a href="https://rfihabsudkpoqozp.public.blob.vercel-storage.com/slides/2026-05-22-madvue-beyond-nuxt-4.pdf" target="_blank">
      beyond-nuxt-4.pdf
    </a>
  </div>

- 🌐 Nuxt
  <div class="opacity-70 text-xs break-all">
    <a href="https://nuxt.com" target="_blank">nuxt.com</a> ·
    <a href="https://nitro.build" target="_blank">nitro.build</a>
  </div>

- 👤 Speaker
  <div class="opacity-70 text-xs break-all">
    <a href="https://danielroe.dev" target="_blank">danielroe.dev</a>
  </div>

</div>

<div class="text-xs opacity-60 mt-3">
  <strong>For us:</strong> we don't use Nuxt and nothing here says we should —
  Vite 8 and Vapor mode reach our stack on their own. The part of this talk
  that actually stuck is on the next slide. →
</div>

<!--
Önce teknik olmayan arkadaşlar için: Nuxt, Vue uygulamaları kurmak için en
popüler "her şey dahil" framework. Biz kullanmıyoruz ama Vue ekosisteminin
geleceği önce orada şekilleniyor — bu yüzden roadmap'i bizim için de ön izleme.

Roadmap'i bir slaytta özetliyorum: Nuxt 4.5 yakında, odaklı bir minor. Nuxt 5
ise önümüzdeki yıl boyunca geliyor — Vite 8 üzerine yeniden kuruluyor,
"progressive JS" ile compiler her component için en ucuz render modunu
seçecek, her şey typed olacak. Bizim için aksiyon yok: Nuxt kullanmıyoruz ve
kullanmamız gerektiğini söyleyen bir şey de yok; Vite 8 ve Vapor zaten
kendiliğinden stack'imize gelecek.

Ama bu konuşmadan asıl aklımda kalan roadmap değil. Bir sonraki slaytta —
sesi açın.
-->
---
hideInToc: true
---

# Beyond Nuxt 4 — "people come first" 🎬

<div class="flex items-start justify-center gap-8 mt-1">
  <video
    :src="'/video/daniel-people-first.mp4'"
    class="h-86 rounded-lg border border-white/15"
    controls playsinline
  />
  <div class="text-sm op-90 max-w-65 mt-2">
    <div class="font-mono text-xs rounded bg-white/5 border border-white/10 px-3 py-2 mb-4">
      CONTRIBUTORS.md &gt; AGENTS.md
    </div>
    <p class="text-xs op-80 leading-relaxed">
      The most heartfelt part of the conference — Daniel on AI and open
      source, ~4½ min <em>(filmed from my seat)</em>:
    </p>
    <ul class="text-xs op-80 mt-2 space-y-1.5">
      <li>"The problem is not agents — the problem is that there's
        <strong>no person</strong> behind the PR."</li>
      <li>"You can't create <strong>people and community</strong> with tokens."</li>
      <li>"If Nuxt has one value going forward, it's that
        <strong>people come first</strong>" — and "what's <strong>intuitive
        for people</strong> is intuitive for agents."</li>
      <li>On the 10x-developer myth: "iterating with a <strong>trusted
        team</strong> beats one genius with a plan — and agents only raise
        that temptation."</li>
      <li>The recipe: <strong>human-empowering · evidence-based ·
        experimentation</strong> over chasing hype.</li>
    </ul>
  </div>
</div>

<!--
Konferansın bana en çok dokunan kısmı bu — kendi koltuğumdan çektim, dört
buçuk dakika, sesi açın. Daniel'ın AI ile ilgili duruşu çok net ve çok insani:

Mesele agent'lar değil — mesele PR'ın arkasında bir insanın olmaması. GitHub
üzerinden bir chatbot'la "haklısınız, hemen değiştiriyorum" diyaloğu yaşamak
istemiyorum diyor — olabilecek en kötü deneyim. Token harcayarak teknoloji
üretebilirsiniz ama insan ve topluluk üretemezsiniz. Nuxt'ın bundan sonrası
için tek bir değeri olacaksa o da şu: önce insan. Pratik tarafı da var:
insanlar için sezgisel olan, agent'lar için de sezgiseldir.

Devamında 10x developer efsanesine giriyor: tek başına harika şeyler yapan
dahi fikri cazip, agent'lar bu cazibeyi daha da büyütüyor — ama araştırmalar
net: güvendiğin bir ekiple yanıla yanıla ilerlemek, tek dahinin planından
çok daha iyi sonuç veriyor. Ve Nuxt'ın AI tarifi: insanı güçlendiren,
kanıta dayalı, hype kovalamak yerine deneye dayalı. Video "Enough about AI"
diye bitiyor — kapanışı kendisi yapıyor.
-->

---
layout: section
---

# Other talks

Photos & notes — full write-ups coming later

<!--
Bu yedi konuşmanın dışında iki tane daha vardı. Onlar için elimde sadece
fotoğraf ve notlar var, ileride ayrı bir oturumda detaylı paylaşırım.
-->
---
hideInToc: true
---

# Other talks I attended

A quick rundown — deeper write-ups in a follow-up session:

<div class="flex items-center gap-3 mt-4">
  <img :src="'/img/nestor-lopez.jpg'" class="w-10 h-10 rounded-full object-cover" alt="Néstor López">
  <span><strong>Néstor López</strong> — <em>Superpositioned Vue components with Module Federation</em></span>
</div>

<div class="flex items-center gap-3 mt-3">
  <img :src="'/img/juan-andres-nunez.jpg'" class="w-10 h-10 rounded-full object-cover" alt="Juan Andrés Núñez">
  <span><strong>Juan Andrés Núñez</strong> — <em>Learning professional Frontend with Science and Agentic AI</em></span>
</div>

<!--
Néstor López'in Module Federation konuşması vardı — micro-frontend pattern'larıyla
ilgilenenler için iyi bir kaynak, Daniel'ın bahsettiği Nuxt module federation
desteğiyle de örtüşüyor. Juan Andrés Núñez ise agentic AI ve frontend'i bilimsel
bir yaklaşımla ele aldı. Hangisi ilgilendirirse söyleyin, sıraya alırım.
-->
---
hideInToc: true
class: p-0
---

<div class="absolute inset-0 grid grid-cols-2">
  <div class="bg-black flex items-center justify-center overflow-hidden">
    <video
      :src="'/video/cup-game.mp4'"
      class="h-full object-contain"
      autoplay muted loop playsinline controls
    />
  </div>
  <div class="flex flex-col justify-center px-12">
    <p class="text-sm op-80 mt-4">
     Thanks!
    </p>
  </div>
</div>

---
layout: cover
background: /img/madrid-beer.webp
class: text-center
hideInToc: true
---

# Thanks!


<div class="abs-br m-6 text-xs opacity-60 text-right">
  📺 All four published recordings:
  <a href="https://www.youtube.com/playlist?list=PL4bHd5WrBTFg6w7wU3GvinYlP6IcR0yv1" target="_blank">
    the official MadVue 2026 playlist
  </a>
</div>
