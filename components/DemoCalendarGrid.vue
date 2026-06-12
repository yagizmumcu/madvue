<script setup lang="ts">
import type { CalendarProps } from '@formwerk/core'
import { CalendarCell, useCalendar } from '@formwerk/core'

const props = defineProps<CalendarProps>()

const {
  calendarProps,
  gridProps,
  gridLabel,
  gridLabelProps,
  nextButtonProps,
  previousButtonProps,
  currentView,
} = useCalendar(props)
</script>

<template>
  <div v-bind="calendarProps" class="demo-calendar rounded border border-white/15 bg-white/5 p-2 select-none">
    <div class="flex items-center justify-between mb-1">
      <button v-bind="previousButtonProps" class="w-6 h-6 rounded hover:bg-white/10 op-70">‹</button>
      <button v-bind="gridLabelProps" class="text-xs font-semibold rounded px-2 py-0.5 hover:bg-white/10">
        {{ gridLabel }}
      </button>
      <button v-bind="nextButtonProps" class="w-6 h-6 rounded hover:bg-white/10 op-70">›</button>
    </div>

    <div v-if="currentView.type === 'weeks'" v-bind="gridProps" class="grid grid-cols-7 gap-0.5 text-center">
      <div v-for="wd in currentView.weekDays" :key="wd" class="text-[9px] op-40 py-0.5">
        {{ wd }}
      </div>
      <CalendarCell
        v-for="day in currentView.days"
        :key="day.value.toString()"
        v-bind="day"
        class="day-cell text-[11px] leading-none py-1 rounded cursor-pointer outline-none"
        :class="{
          'bg-teal-400/80 text-black font-bold': day.selected,
          'ring-1 ring-teal-400/60': day.isToday && !day.selected,
          'op-25': day.isOutsideMonth,
          'hover:bg-white/15': !day.selected,
        }"
      />
    </div>

    <div v-else-if="currentView.type === 'months'" v-bind="gridProps" class="grid grid-cols-3 gap-0.5 text-center">
      <CalendarCell
        v-for="cell in currentView.months"
        :key="cell.label"
        v-bind="cell"
        class="text-[11px] py-1.5 rounded cursor-pointer outline-none"
        :class="cell.selected ? 'bg-teal-400/80 text-black font-bold' : 'hover:bg-white/15'"
      />
    </div>

    <div v-else-if="currentView.type === 'years'" v-bind="gridProps" class="grid grid-cols-3 gap-0.5 text-center">
      <CalendarCell
        v-for="cell in currentView.years"
        :key="cell.label"
        v-bind="cell"
        class="text-[11px] py-1.5 rounded cursor-pointer outline-none"
        :class="cell.selected ? 'bg-teal-400/80 text-black font-bold' : 'hover:bg-white/15'"
      />
    </div>
  </div>
</template>
