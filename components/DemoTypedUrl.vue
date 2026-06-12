<script setup lang="ts">
import { computed, ref } from 'vue'

const pathId = ref('42')
const page = ref('3')

function intParse(v: string): number | null {
  const t = v.trim()
  return /^-?\d+$/.test(t) ? Number(t) : null
}

const idResult = computed(() => intParse(pathId.value))
const pageResult = computed(() => intParse(page.value))
</script>

<template>
  <div class="demo-typed-url text-sm">
    <div class="rounded border border-white/10 p-3 mb-3 font-mono text-xs flex items-center gap-1 flex-wrap">
      <span class="op-50">https://app.example.com</span>
      <span class="op-70">/products/</span>
      <input
        v-model="pathId"
        class="w-20 rounded border border-white/20 bg-white/5 px-2 py-0.5 outline-none focus:border-teal-400 text-center"
      >
      <span class="op-70">?page=</span>
      <input
        v-model="page"
        class="w-20 rounded border border-white/20 bg-white/5 px-2 py-0.5 outline-none focus:border-teal-400 text-center"
      >
      <span class="ml-auto op-40 font-sans">← edit me</span>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div
        class="rounded border p-3"
        :class="idResult !== null ? 'border-teal-400/40' : 'border-red-400/50'"
      >
        <div class="text-xs op-50 mb-1">path param · <code>[id=int].vue</code></div>
        <template v-if="idResult !== null">
          <div class="text-teal-400">✓ route matches</div>
          <div class="font-mono text-xs mt-1">params.id = {{ idResult }} <span class="op-50">// number</span></div>
        </template>
        <template v-else>
          <div class="text-red-400">✗ 404 — parser missed</div>
          <div class="font-mono text-xs mt-1 op-60">"{{ pathId }}" is not an int → no match</div>
        </template>
      </div>

      <div
        class="rounded border p-3"
        :class="pageResult !== null ? 'border-teal-400/40' : 'border-amber-400/50'"
      >
        <div class="text-xs op-50 mb-1">query param · <code>page=int</code></div>
        <template v-if="pageResult !== null">
          <div class="text-teal-400">✓ parsed</div>
          <div class="font-mono text-xs mt-1">query.page = {{ pageResult }} <span class="op-50">// number</span></div>
        </template>
        <template v-else>
          <div class="text-amber-400">⚠ falls back to default — route still matches</div>
          <div class="font-mono text-xs mt-1 op-60">query.page = 1 <span class="op-50">// default</span></div>
        </template>
      </div>
    </div>
  </div>
</template>
