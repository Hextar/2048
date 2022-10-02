<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

import { useEventBus, EVENT_BUS_MESSAGES } from '~/composables/useEventBus'
import { useGame } from '~/composables/useGame'


const { bus } = useEventBus()
const {
  gameRows,
  gameCols,
  cellValue,
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
    <div class="game__board flex flex-col justify-center items-center pa-2 w-full bg-secondary rounded-md">
      <div v-for="(_, idxRow) in gameRows" :key="`row-${idxRow}`"
        class="game__board__row flex justify-center items-center w-full">
        <div v-for="(_, idxCol) in gameCols" :key="`col-${idxRow}-${idxCol}`"
          class="game__board__row__col flex justify-center items-center bg-tertiary aspect-square ma-2 pa-2 rounded-md"
          :class="`game__board__row__col--${cellValue(idxRow, idxCol)}`" :style="style">
          <span class="game__board__row__col__item font-body text-5xl font-900 text-typography-dark">
            {{ cellValue(idxRow, idxCol) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.game__board {
  &__row {
    &__col {
      &--2 {
        background-color: #eee4da;
        color: #776e65;
      }

      &--4 {
        background-color: #eee1c9;
        color: #776e65;
      }

      &--8 {
        background-color: #f3b27a;
        color: #f9f6f2;
      }

      &--16 {
        background-color: #f69664;
        color: #f9f6f2;
      }

      &--32 {
        background-color: #f77c5f;
        color: #f9f6f2;
      }

      &--64 {
        background-color: #f75f3b;
        color: #f9f6f2;
      }

      &--128 {
        background-color: #edd073;
        color: #f9f6f2;
      }

      &--256 {
        background-color: #edcc62;
        color: #f9f6f2;
      }

      &--512 {
        background-color: #edc950;
        color: #f9f6f2;
      }

      &--1024 {
        background-color: #edc53f;
        color: #f9f6f2;
      }

      &--2048 {
        background-color: #edc22e;
        color: #f9f6f2;
      }
    }
  }
}
</style>
