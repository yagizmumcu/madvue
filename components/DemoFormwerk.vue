<script setup lang="ts">
import { DateTimeSegment, useDateField, useTextField } from '@formwerk/core'
import { computed, ref, toValue } from 'vue'

const { inputProps, labelProps, errorMessage, errorMessageProps, fieldValue } = useTextField({
  label: 'Work email',
  name: 'email',
  type: 'email',
  required: true,
})

const locale = ref('en-US')
const locales = ['en-US', 'tr-TR', 'ar-EG']
const {
  controlProps: dateControlProps,
  labelProps: dateLabelProps,
  segments,
  fieldValue: dateValue,
  calendarProps,
} = useDateField({
  label: 'Launch date',
  name: 'launchDate',
  locale,
  value: new Date(),
})

const ariaAttrs = computed(() => {
  const all = toValue(inputProps) as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(all ?? {})) {
    if (typeof v === 'function' || v === undefined)
      continue
    out[k] = v
  }
  return out
})
</script>

<template>
  <div class="demo-formwerk grid grid-cols-2 gap-4 text-sm">
    <div class="rounded border border-white/10 p-3 self-start">
      <div class="text-xs op-50 mb-2">Our markup, formwerk's brain — type, blur, clear…</div>

      <label v-bind="labelProps" class="block text-xs op-70 mb-1">Work email *</label>
      <input
        v-bind="inputProps"
        class="w-full rounded border border-white/20 bg-white/5 px-3 py-1 outline-none focus:border-teal-400"
        placeholder="you@mobileaction.co"
      >
      <div v-if="errorMessage" v-bind="errorMessageProps" class="mt-1 text-xs text-red-400">
        ⚠ {{ errorMessage }}
      </div>
      <div v-else class="mt-1 text-xs text-teal-400 op-80">
        ✓ value: <code>{{ JSON.stringify(fieldValue ?? '') }}</code>
      </div>

      <div class="text-xs op-50 mt-3 mb-1">…ARIA as an <em>output</em>, updating live:</div>
      <pre class="text-[10px] leading-snug op-90 whitespace-pre-wrap m-0 rounded bg-white/5 p-2">{{ JSON.stringify(ariaAttrs, null, 1) }}</pre>
    </div>

    <div class="rounded border border-white/10 p-3">
      <div class="flex items-center justify-between mb-1">
        <label v-bind="dateLabelProps" class="text-xs op-70">Launch date</label>
        <span class="flex gap-1">
          <button
            v-for="l in locales"
            :key="l"
            class="rounded border px-1.5 text-[10px]"
            :class="locale === l ? 'border-teal-400/60 text-teal-300' : 'border-white/15 op-50 hover:op-90'"
            @click="locale = l"
          >{{ l }}</button>
        </span>
      </div>

      <div
        v-bind="dateControlProps"
        class="rounded border border-white/20 bg-white/5 px-3 py-1 font-mono inline-flex mb-2"
      >
        <DateTimeSegment
          v-for="s in segments"
          :key="s.type"
          v-bind="s"
          class="px-0.5 rounded outline-none focus:bg-teal-400/25 data-[segment-type=literal]:op-40"
        />
      </div>

      <DemoCalendarGrid v-bind="calendarProps" />

      <div v-if="dateValue" class="mt-1 text-xs text-teal-400 op-80">
        ✓ one field, two views — a real <code>Date</code>: {{ dateValue.toISOString().slice(0, 10) }}
      </div>
    </div>
  </div>
</template>
