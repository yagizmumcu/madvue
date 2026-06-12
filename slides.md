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
  <img :src="$base + 'img/madvue-bros.webp'" class="rounded-lg border border-white/15 w-full h-40 object-cover" alt="Me and Ahmet at the MadVue banner">
  <div class="text-xs op-60 mt-1.5 mb-2">your field-research team, on location 🇪🇸</div>
  <img :src="$base + 'img/saha-arastirmacisi.png'" class="rounded-lg border border-white/15 w-full" alt="">
</div>

</div>

---
layout: section
---

# Type-Safe URLs

Eduardo San Martin Morote

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

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Type-Safe URLs

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="$base + 'img/eduardo-san-martin.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Eduardo San Martin Morote">
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

<img :src="$base + 'img/ahmet-eduardo.webp'" class="rounded-lg border border-white/15 w-full h-44 object-cover" alt="Ahmet and Eduardo discussing qpick at MadVue 2026">
<div class="text-[10px] op-50 mt-1 text-center">the actual five minutes — Ahmet & Eduardo, MadVue 2026</div>

<div class="grid grid-cols-2 gap-1.5 mt-2">
  <img :src="$base + 'img/eduardo-yagiz.webp'" class="rounded border border-white/15 h-24 w-full object-cover" alt="Eduardo and me">
  <img :src="$base + 'img/arda-bill.png'" class="rounded border border-white/15 h-24 w-full object-cover" alt="">
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

---
layout: section
---

# Oxc, Rolldown, Vitest, Vite

The future of the JavaScript toolchain · Élise Patrikainen · 11:55

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
  <img :src="$base + 'img/eslint-icon.png'" class="w-9 h-9 mt-0.5" alt="ESLint">
  <div>
    <div class="font-semibold">Linter <span class="text-xs op-50 font-normal">— ESLint, now Oxlint</span></div>
    <div class="text-xs op-70 mt-0.5">The <strong>proof-reader</strong>. Scans code for
    bugs and style mistakes before users ever see them — spell-check for code.</div>
  </div>
</div>

<div class="rounded border border-white/10 p-3 flex gap-3 items-start">
  <img :src="$base + 'img/oxc.svg'" class="w-9 h-9 mt-0.5" alt="Oxc">
  <div>
    <div class="font-semibold">Compiler <span class="text-xs op-50 font-normal">— Oxc</span></div>
    <div class="text-xs op-70 mt-0.5">The <strong>translator</strong>. Turns the languages
    developers prefer (TypeScript, Vue) into the plain JavaScript browsers actually run.</div>
  </div>
</div>

<div class="rounded border border-white/10 p-3 flex gap-3 items-start">
  <img :src="$base + 'img/rolldown.svg'" class="w-9 h-9 mt-0.5" alt="Rolldown">
  <div>
    <div class="font-semibold">Bundler <span class="text-xs op-50 font-normal">— Rollup, now Rolldown</span></div>
    <div class="text-xs op-70 mt-0.5">The <strong>packer</strong>. Squeezes hundreds of source
    files into a few small, optimized ones so the app downloads and starts fast.</div>
  </div>
</div>

<div class="rounded border border-white/10 p-3 flex gap-3 items-start">
  <img :src="$base + 'img/vitest.svg'" class="w-9 h-9 mt-0.5" alt="Vitest">
  <div>
    <div class="font-semibold">Test runner <span class="text-xs op-50 font-normal">— Vitest</span></div>
    <div class="text-xs op-70 mt-0.5">The <strong>inspector</strong>. Re-runs thousands of
    automated checks after every change to prove nothing broke.</div>
  </div>
</div>

</div>

<div class="rounded border border-teal-400/30 p-3 mt-3 flex gap-3 items-center text-sm">
  <img :src="$base + 'img/vite.svg'" class="w-9 h-9" alt="Vite">
  <div>
    <span class="font-semibold">Build tool / dev server — Vite.</span>
    <span class="text-xs op-70">The <strong>conductor</strong>: runs the whole factory instantly while
    developing, then drives every station for the production build. The talk: VoidZero is rebuilding
    every station in Rust on one shared engine (Oxc) — that's where the 10–100× comes from.</span>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# The future of the JS toolchain

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="$base + 'img/elise-patrikainen.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Élise Patrikainen">
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

---
hideInToc: true
---

# Toolchain — live demo

<div class="text-xs op-60 mb-3">
  The same app, built twice — today's factory vs. the Rust factory.
  Speeds use the real-world ratios from the talk:
</div>

<DemoToolchain />

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

---
layout: section
---

# Adaptive UIs with Vue and AI

What if your UI could build itself? · Markus Oberlehner · 10:10

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Adaptive UIs with Vue and AI

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="$base + 'img/markus-oberlehner.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Markus Oberlehner">
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

---
hideInToc: true
---

# Adaptive UIs — live demo

<div class="text-xs op-60 mb-2">
  A user asks a question. No screen for it exists. Watch one get built — and watch
  what changes when the model is slow:
</div>

<DemoAdaptiveStream />

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

---
layout: section
---

# Clean Code Is Sexy Again

Making your Vue project AI-ready · Alexander Opalic


---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Clean Code Is Sexy Again

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="$base + 'img/alexander-opalic.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Alexander Opalic">
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

---
layout: section
---

# A New Model for Form Components

Abdelrahman Awad


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

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# A New Model for Form Components

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="$base + 'img/abdelrahman-awad.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Abdelrahman Awad">
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

---
layout: section
---

# Vue Real-Time Apps

Nico Devs · 09:30

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Vue Real-Time Apps

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="$base + 'img/nico-devs.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Nico Devs">
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
  <img :src="$base + 'img/nico-beers.webp'" class="rounded-lg border border-white/15 w-full h-44 object-cover" alt="Post-conference beers with Nico">
  <div class="text-[10px] op-50 mt-1 text-center">Neco baba ve bizzo</div>
</div>


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

---
layout: section
---

# Beyond Nuxt 4

Daniel Roe · Nuxt team lead

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

---
layout: two-cols
layoutClass: gap-8
hideInToc: true
---

# Beyond Nuxt 4

<div class="text-sm">

<div class="flex items-center gap-2">
  <img :src="$base + 'img/daniel-roe.jpg'" class="w-9 h-9 rounded-full object-cover" alt="Daniel Roe">
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

---
hideInToc: true
---

# Beyond Nuxt 4 — "people come first" 🎬

<div class="flex items-start justify-center gap-8 mt-1">
  <video
    :src="$base + 'video/daniel-people-first.mp4'"
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


---
layout: section
---

# Other talks

Photos & notes — full write-ups coming later

---
hideInToc: true
---

# Other talks I attended

A quick rundown — deeper write-ups in a follow-up session:

<div class="flex items-center gap-3 mt-4">
  <img :src="$base + 'img/nestor-lopez.jpg'" class="w-10 h-10 rounded-full object-cover" alt="Néstor López">
  <span><strong>Néstor López</strong> — <em>Superpositioned Vue components with Module Federation</em></span>
</div>

<div class="flex items-center gap-3 mt-3">
  <img :src="$base + 'img/juan-andres-nunez.jpg'" class="w-10 h-10 rounded-full object-cover" alt="Juan Andrés Núñez">
  <span><strong>Juan Andrés Núñez</strong> — <em>Learning professional Frontend with Science and Agentic AI</em></span>
</div>

---
hideInToc: true
class: p-0
---

<div class="absolute inset-0 grid grid-cols-2">
  <div class="bg-black flex items-center justify-center overflow-hidden">
    <video
      :src="$base + 'video/cup-game.mp4'"
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

