<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

interface Q { q: string, options: string[], correct: number, why?: string }

// fair game: every answer was on a slide, a demo, or a meme — no code knowledge needed
const questions: Q[] = [
  {
    q: 'Share a link and your teammate lands on exactly your screen. Eduardo calls this the URL\'s…',
    options: ['Teleportation', 'Telepathy', 'Time travel', 'Tunneling'],
    correct: 0,
    why: 'Time travel is the OTHER superpower — back/forward = free undo.',
  },
  {
    q: 'In our app today, when you change the filters, the URL…',
    options: ['Updates instantly', 'Updates after 5 s', 'Doesn\'t change at all', 'Becomes longer'],
    correct: 2,
    why: 'That\'s why copied links don\'t share what you see — yet.',
  },
  {
    q: 'Build-tools history: which tool came FIRST?',
    options: ['Vite', 'webpack', 'Rolldown', 'Oxlint'],
    correct: 1,
    why: '2012 — the bundler era, config hell and coffee-break builds.',
  },
  {
    q: 'The new toolchain is 10–100× faster mostly because it\'s rewritten in…',
    options: ['Python', 'Java', 'Excel macros', 'Rust'],
    correct: 3,
  },
  {
    q: 'In the adaptive-UI demo, the AI is only allowed to build screens from…',
    options: ['Any HTML it likes', 'Approved building blocks', 'Screenshots', 'Comic Sans'],
    correct: 1,
    why: 'It can\'t invent block № 5 — that\'s the whole safety model.',
  },
  {
    q: 'Eduardo\'s 5-minute review of Ahmet\'s qpick found the missing guarantee:',
    options: ['More colors', 'A better logo', 'Read it & write it back — nothing changes', 'Fewer dependencies'],
    correct: 2,
    why: 'Idempotency — otherwise the URL flickers and history fills with junk.',
  },
  {
    q: 'In formwerk, the accessibility (ARIA) attributes are…',
    options: ['A checklist per component', 'Optional', 'QA\'s problem', 'An output you get for free'],
    correct: 3,
  },
  {
    q: 'Nico\'s ladder: are our dashboards truly live today?',
    options: ['Yes, always', 'No — they re-ask every 1–3 minutes', 'Only on Fridays', 'Only the dark-mode ones'],
    correct: 1,
  },
  {
    q: 'Daniel Roe\'s one value for Nuxt going forward:',
    options: ['Tokens come first', 'Ship faster', 'People come first', 'Rewrite everything in Rust'],
    correct: 2,
    why: 'CONTRIBUTORS.md > AGENTS.md',
  },
  {
    q: 'The official relevance-level benchmark photo features Bill Gates and…',
    options: ['Evan You', 'Eduardo', 'Daniel Roe', 'Arda Turan'],
    correct: 3,
  },
]

const shapes = ['▲', '◆', '●', '■']
const colors = [
  'bg-red-500/80 hover:bg-red-500',
  'bg-blue-500/80 hover:bg-blue-500',
  'bg-yellow-500/80 hover:bg-yellow-500 text-black',
  'bg-green-600/80 hover:bg-green-600',
]

const idx = ref(-1)
const revealed = ref(false)
const timeLeft = ref(20)
let timer: ReturnType<typeof setInterval> | undefined

const current = computed(() => questions[idx.value])
const done = computed(() => idx.value >= questions.length)

function startTimer() {
  if (timer) clearInterval(timer)
  timeLeft.value = 20
  timer = setInterval(() => {
    timeLeft.value -= 1
    if (timeLeft.value <= 0) {
      if (timer) clearInterval(timer)
      revealed.value = true
    }
  }, 1000)
}

function next() {
  revealed.value = false
  idx.value += 1
  if (idx.value < questions.length) startTimer()
  else if (timer) clearInterval(timer)
}

function reveal() {
  if (timer) clearInterval(timer)
  revealed.value = true
}

function reset() {
  if (timer) clearInterval(timer)
  idx.value = -1
  revealed.value = false
}

onUnmounted(() => timer && clearInterval(timer))
</script>

<template>
  <div class="kahoot-quiz text-sm">
    <!-- start screen -->
    <div v-if="idx === -1" class="text-center mt-16">
      <div class="text-lg mb-2">🏆 {{ questions.length }} questions · 20 seconds each</div>
      <div class="text-xs op-60 mb-6">
        Everything was on a slide, in a demo, or in a meme — frontend knowledge won't save you.
      </div>
      <button class="rounded-lg border border-teal-400/60 px-8 py-2 text-base hover:bg-teal-400/10" @click="next">
        ▶ Start
      </button>
    </div>

    <!-- done screen -->
    <div v-else-if="done" class="text-center mt-20">
      <div class="text-xl mb-3">🎉 That's the quiz!</div>
      <div class="text-xs op-60 mb-5">Count your points — winner picks where the team lunch happens.</div>
      <button class="rounded border border-white/20 px-4 py-1 text-xs op-70 hover:bg-white/5" @click="reset">
        ↺ Play again
      </button>
    </div>

    <!-- question -->
    <template v-else>
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs op-50">{{ idx + 1 }} / {{ questions.length }}</span>
        <span
          class="text-base font-mono tabular-nums rounded-full w-10 h-10 flex items-center justify-center border-2"
          :class="timeLeft <= 5 && !revealed ? 'border-red-400 text-red-400' : 'border-white/25'"
        >{{ revealed ? '—' : timeLeft }}</span>
        <span class="flex gap-2">
          <button v-if="!revealed" class="rounded border border-white/20 px-3 py-0.5 text-xs op-70 hover:bg-white/5" @click="reveal">
            Reveal
          </button>
          <button v-else class="rounded border border-teal-400/50 px-3 py-0.5 text-xs hover:bg-teal-400/10" @click="next">
            Next →
          </button>
        </span>
      </div>

      <div class="text-base font-semibold text-center my-4 min-h-12">{{ current.q }}</div>

      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="(opt, i) in current.options"
          :key="opt"
          class="rounded-lg px-4 py-3 font-medium transition-all flex items-center gap-3"
          :class="[
            revealed && i === current.correct ? 'bg-green-600 ring-2 ring-white scale-[1.02]'
            : revealed ? 'bg-white/5 op-40'
            : colors[i],
          ]"
        >
          <span class="text-lg">{{ shapes[i] }}</span>
          <span>{{ opt }}</span>
          <span v-if="revealed && i === current.correct" class="ml-auto">✓</span>
        </div>
      </div>

      <div v-if="revealed && current.why" class="text-xs op-60 mt-3 text-center">
        {{ current.why }}
      </div>
    </template>
  </div>
</template>
