<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// the "true" server-side value, random-walking
const truth = ref(1240)
const live = ref(1240)
const polled = ref(1240)
const requests = ref(0)
const ageMs = ref(0)

let walkTimer: ReturnType<typeof setInterval> | undefined
let pollTimer: ReturnType<typeof setInterval> | undefined
let ageTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  walkTimer = setInterval(() => {
    truth.value = Math.max(0, truth.value + Math.round((Math.random() - 0.45) * 30))
    live.value = truth.value // SSE: pushed instantly
  }, 400)

  pollTimer = setInterval(() => {
    polled.value = truth.value // polling: snapshot every 3s
    requests.value++
    ageMs.value = 0
  }, 3000)

  ageTimer = setInterval(() => {
    ageMs.value += 100
  }, 100)
})

onUnmounted(() => {
  [walkTimer, pollTimer, ageTimer].forEach(t => t && clearInterval(t))
})
</script>

<template>
  <div class="demo-realtime grid grid-cols-2 gap-4 text-sm">
    <div class="rounded border border-white/10 p-4">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs op-50">how our dashboards work today</span>
        <span class="text-[10px] rounded bg-amber-400/15 text-amber-300 px-2 py-0.5">polling</span>
      </div>
      <div class="text-2xl font-semibold tabular-nums" :class="polled !== truth ? 'op-60' : ''">
        € {{ polled.toLocaleString('en-US') }}
      </div>
      <div class="text-xs op-50 mt-1 tabular-nums">
        data is {{ (ageMs / 1000).toFixed(1) }}s old · {{ requests }} requests so far
      </div>
      <div v-if="polled !== truth" class="text-xs text-amber-400 mt-1">
        ⚠ stale — real value is € {{ truth.toLocaleString('en-US') }}
      </div>
      <div v-else class="text-xs op-30 mt-1">momentarily accurate…</div>
    </div>

    <div class="rounded border border-teal-400/30 p-4">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs op-50">what the chatbot already does</span>
        <span class="text-[10px] rounded bg-teal-400/15 text-teal-300 px-2 py-0.5">SSE stream</span>
      </div>
      <div class="text-2xl font-semibold tabular-nums text-teal-300">
        € {{ live.toLocaleString('en-US') }}
      </div>
      <div class="text-xs op-50 mt-1">
        always current · 1 open connection, 0 re-requests
      </div>
      <div class="text-xs text-teal-400/70 mt-1">● live</div>
    </div>
  </div>
</template>
