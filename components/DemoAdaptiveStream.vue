<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

// the user's request — this is all the input the AI gets
const question = 'How is our order intake doing this month?'

// ingredient 1: a fast model changes everything — switch while it streams
const models = [
  { id: 'fast', label: '⚡ fast model', tick: 22 },
  { id: 'slow', label: '🐢 big slow model', tick: 90 },
]
const model = ref('fast')

// ingredient 2 + 3: an efficient, streamable JSON spec (same shape as Markus's demo)
const spec = `{
  "dataSources": ["orderIntake(month) -> orders"],
  "children": [
    { "section": { "headline": "Order Intake — June" } },
    { "metricCard": { "eyebrow": "Total Order Intake",
        "number": 128450, "numberPrefix": "€" } },
    { "metricCard": { "eyebrow": "Open Orders",
        "number": 37 } },
    { "metricCard": { "eyebrow": "Avg. Order Value",
        "number": 3471, "numberPrefix": "€" } },
    { "barChart": { "label": "Orders per week",
        "bars": [18, 26, 31, 24] } }
  ]
}`

const cards = [
  { eyebrow: 'Total Order Intake', value: '€ 128,450' },
  { eyebrow: 'Open Orders', value: '37' },
  { eyebrow: 'Avg. Order Value', value: '€ 3,471' },
]
const chartBars = [18, 26, 31, 24]

const mark = (needle: string, end = false) => {
  const at = spec.indexOf(needle)
  return end ? spec.indexOf('}', at) + 1 : at
}
const headlineAt = { start: mark('"section"'), end: mark('Order Intake — June"', true) }
const cardMarks = cards.map(c => ({ start: mark(`"${c.eyebrow}"`), end: spec.indexOf('} }', mark(`"${c.eyebrow}"`)) + 3 }))
const chartAt = { start: mark('"barChart"'), end: spec.indexOf('] }', mark('"barChart"')) + 3 }

const pos = ref(0)
const asked = ref(false)
const shown = computed(() => spec.slice(0, pos.value))
const done = computed(() => pos.value >= spec.length)
let timer: ReturnType<typeof setTimeout> | undefined

function step() {
  pos.value = Math.min(pos.value + 3, spec.length)
  if (pos.value < spec.length) {
    const tick = models.find(m => m.id === model.value)!.tick
    timer = setTimeout(step, tick)
  }
}

function ask() {
  reset()
  asked.value = true
  step()
}

function reset() {
  if (timer) clearTimeout(timer)
  pos.value = 0
  asked.value = false
}

const state = (m: { start: number, end: number }) =>
  pos.value >= m.end ? 'ready' : pos.value >= m.start ? 'loading' : 'hidden'

// the palette: the AI may ONLY use these approved blocks
const palette = computed(() => [
  { name: 'Section', used: state(headlineAt) !== 'hidden', approved: true },
  { name: 'MetricCard', used: cardMarks.some(m => state(m) !== 'hidden'), approved: true },
  { name: 'BarChart', used: state(chartAt) !== 'hidden', approved: true },
  { name: 'RawHTML', used: false, approved: false },
])

onUnmounted(() => timer && clearTimeout(timer))
</script>

<template>
  <div class="demo-adaptive text-sm">
    <div class="flex items-center gap-2 mb-2">
      <div class="flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs op-80 truncate">
        💬 {{ question }}
      </div>
      <button class="rounded border border-teal-400/50 px-3 py-1 text-xs hover:bg-teal-400/10 shrink-0" @click="ask">
        Ask ▶
      </button>
      <button class="rounded border border-white/20 px-2 py-1 text-xs op-60 hover:bg-white/5 shrink-0" @click="reset">↺</button>
      <span class="flex gap-1 shrink-0">
        <button
          v-for="m in models"
          :key="m.id"
          class="rounded border px-1.5 py-1 text-[10px]"
          :class="model === m.id ? 'border-teal-400/60 text-teal-300' : 'border-white/15 op-50 hover:op-90'"
          @click="model = m.id"
        >{{ m.label }}</button>
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <div class="text-[10px] op-40 mb-1">the AI's answer — not code, just a shopping list of approved blocks</div>
        <pre class="rounded border border-white/10 p-2 text-[9.5px] leading-snug h-44 overflow-hidden m-0">{{ shown }}<span v-if="!done && asked" class="cursor">▌</span></pre>
      </div>

      <div>
        <div class="text-[10px] op-40 mb-1">the screen, assembling while the AI is still answering</div>
        <div class="rounded border border-white/10 p-2 h-44 overflow-hidden">
          <div v-if="!asked" class="text-xs op-40 mt-14 text-center">press <strong>Ask ▶</strong> — try switching models mid-answer</div>

          <div v-if="state(headlineAt) === 'ready'" class="text-xs font-semibold mb-1.5">Order Intake — June</div>
          <div v-else-if="state(headlineAt) === 'loading'" class="skeleton h-4 w-32 rounded mb-1.5" />

          <div class="grid grid-cols-3 gap-1.5 mb-1.5">
            <template v-for="(c, i) in cards" :key="c.eyebrow">
              <div v-if="state(cardMarks[i]) !== 'hidden'" class="rounded bg-white/5 border border-white/10 px-2 py-1">
                <div class="text-[8px] uppercase tracking-wide op-50 truncate">{{ c.eyebrow }}</div>
                <div v-if="state(cardMarks[i]) === 'ready'" class="text-xs font-semibold">{{ c.value }}</div>
                <div v-else class="skeleton h-3.5 w-12 rounded mt-0.5" />
              </div>
            </template>
          </div>

          <template v-if="state(chartAt) !== 'hidden'">
            <div class="text-[8px] uppercase tracking-wide op-50 mb-0.5">Orders per week</div>
            <div class="flex items-end gap-1.5 h-12">
              <div
                v-for="(b, i) in chartBars"
                :key="i"
                class="flex-1 rounded-t bg-teal-400/60 transition-all duration-500"
                :style="{ height: state(chartAt) === 'ready' ? `${(b / 31) * 100}%` : '8%' }"
              />
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-1.5 mt-2 text-[10px]">
      <span class="op-40">approved building blocks:</span>
      <span
        v-for="p in palette"
        :key="p.name"
        class="rounded border px-1.5 py-0.5"
        :class="!p.approved ? 'border-red-400/30 text-red-400/60 line-through'
          : p.used ? 'border-teal-400/60 text-teal-300' : 'border-white/15 op-50'"
      >{{ p.name }}</span>
      <span class="op-40 ml-1">— the AI picks from this box; it can't invent block № 5</span>
      <span v-if="done" class="ml-auto text-teal-400">✓ usable long before the answer finished</span>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.08) 75%);
  background-size: 200% 100%;
  animation: shimmer 1s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.cursor {
  animation: blink 0.8s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
</style>
