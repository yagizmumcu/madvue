<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

interface Station { name: string, logo: string, dur: number }
interface Lane { title: string, tone: string, stations: Station[] }

// durations scaled from the real-world ratios in the talk
// (oxlint 50-100x faster than ESLint, Rolldown 10-30x faster than Rollup)
const lanes: Lane[] = [
  {
    title: 'Today — the JavaScript toolchain',
    tone: 'amber',
    stations: [
      { name: 'ESLint checks the code', logo: '/img/eslint-icon.png', dur: 3500 },
      { name: 'Rollup packs the app', logo: '/img/rollup.svg', dur: 4500 },
    ],
  },
  {
    title: 'Tomorrow — the Rust toolchain (VoidZero)',
    tone: 'teal',
    stations: [
      { name: 'Oxlint checks the code', logo: '/img/oxc.svg', dur: 60 },
      { name: 'Rolldown packs the app', logo: '/img/rolldown.svg', dur: 320 },
    ],
  },
]

const elapsed = ref(0)
const running = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

const laneTotal = (lane: Lane) => lane.stations.reduce((s, st) => s + st.dur, 0)
const maxTotal = Math.max(...lanes.map(laneTotal))

function stationProgress(lane: Lane, idx: number) {
  let before = 0
  for (let i = 0; i < idx; i++) before += lane.stations[i].dur
  const st = lane.stations[idx]
  return Math.min(1, Math.max(0, (elapsed.value - before) / st.dur))
}

const laneElapsed = (lane: Lane) => Math.min(elapsed.value, laneTotal(lane))
const laneDone = (lane: Lane) => elapsed.value >= laneTotal(lane)
const allDone = computed(() => elapsed.value >= maxTotal)

function run() {
  reset()
  running.value = true
  timer = setInterval(() => {
    elapsed.value += 50
    if (elapsed.value >= maxTotal) {
      running.value = false
      if (timer) clearInterval(timer)
    }
  }, 50)
}

function reset() {
  if (timer) clearInterval(timer)
  elapsed.value = 0
  running.value = false
}

onUnmounted(() => timer && clearInterval(timer))
</script>

<template>
  <div class="demo-toolchain text-sm">
    <div class="flex items-center gap-2 mb-3">
      <button class="rounded border border-teal-400/50 px-3 py-0.5 text-xs hover:bg-teal-400/10" @click="run">
        ▶ Run the same build on both
      </button>
      <button class="rounded border border-white/20 px-3 py-0.5 text-xs op-60 hover:bg-white/5" @click="reset">
        ↺ Reset
      </button>
      <span v-if="allDone" class="text-xs text-teal-400">
        same code, same checks — one of these developers is still waiting ☕
      </span>
    </div>

    <div v-for="lane in lanes" :key="lane.title" class="rounded border border-white/10 p-3 mb-2">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs op-70">{{ lane.title }}</span>
        <span
          class="text-xs font-mono tabular-nums"
          :class="laneDone(lane) ? 'text-teal-400' : 'op-50'"
        >
          {{ (laneElapsed(lane) / 1000).toFixed(2) }}s
          <span v-if="laneDone(lane) && elapsed > 0"> ✓ done</span>
          <span v-else-if="running"> {{ lane.tone === 'amber' ? '☕ waiting…' : '' }}</span>
        </span>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div v-for="(st, i) in lane.stations" :key="st.name" class="flex items-center gap-2">
          <img :src="st.logo" class="w-6 h-6 shrink-0" :alt="st.name">
          <div class="flex-1 min-w-0">
            <div class="text-[10px] op-60 truncate">{{ st.name }}</div>
            <div class="h-2 rounded bg-white/10 overflow-hidden">
              <div
                class="h-full transition-none"
                :class="lane.tone === 'amber' ? 'bg-amber-400/70' : 'bg-teal-400/70'"
                :style="{ width: `${stationProgress(lane, i) * 100}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-xs op-50 mt-2">
      This isn't a one-off: it happens on <strong>every save, every commit, every deploy</strong> —
      dozens of times a day, for every developer on the team.
    </div>
  </div>
</template>
