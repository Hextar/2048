<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

import { useEventBus, EVENT_BUS_MESSAGES } from '~/composables/useEventBus'
import { useGame } from '~/composables/useGame'


const { bus } = useEventBus()
const {
  gameRows,
  gameCols,
  filledCells,
  startGame,
  slide,
} = useGame()

const style = computed<string>(() => {
  return `width: ${100 / gameRows.value}%`
})

watch(() => bus.value.get(EVENT_BUS_MESSAGES.NEW_GAME), (val) => {
  startGame()
})

onKeyStroke(['w', 'W', 'ArrowUp'], (e) => {
  e.preventDefault()
  slide('UP')
})
onKeyStroke(['a', 'A', 'ArrowLeft'], (e) => {
  e.preventDefault()
  slide('RIGHT')
})
onKeyStroke(['s', 'S', 'ArrowDown'], (e) => {
  e.preventDefault()
  slide('DOWN')
})
onKeyStroke(['d', 'D', 'ArrowRight'], (e) => {
  e.preventDefault()
  slide('LEFT')
})

</script>

<template>
  <section class="game flex justify-center items-center">
    <div class="game__board relative flex flex-col justify-center items-center pa-2 w-full bg-secondary rounded-md">
      <div v-for="(_, idxRow) in gameRows" :key="`row-${idxRow}`"
        class="game__board__row flex justify-center items-center w-full">
        <div v-for="(_, idxCol) in gameCols" :key="`col-${idxRow}-${idxCol}`"
          class="game__board__row__col flex justify-center items-center bg-tertiary aspect-square ma-2 pa-2 rounded-md"
          :style="style">
        </div>
      </div>
      <div class="game__board__overlay absolute h-full w-full pa-4">
        <div class="game__board__overlay__content relative h-full w-full">
          <Cell v-for="({ row, col, value }) in filledCells" :key="`cel-${row}-${col}`" :value="value" :top="row"
            :left="col" :cell-size="100 / gameRows" />
        </div>
      </div>
    </div>
  </section>
</template>