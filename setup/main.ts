import { defineAppSetup } from '@slidev/types'

// Expose the Vite base path to slide templates as `$base`.
// Dynamic `:src="..."` bindings are runtime strings, so Vite never rewrites
// their leading "/" to include the deploy base (e.g. /madvue/). Referencing
// `$base + 'img/foo.png'` keeps assets working both in `pnpm dev` (base "/")
// and on GitHub Pages (base "/madvue/").
export default defineAppSetup(({ app }) => {
  app.config.globalProperties.$base = import.meta.env.BASE_URL
})
