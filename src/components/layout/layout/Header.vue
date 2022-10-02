<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useEventBus, EVENT_BUS_MESSAGES } from '~/composables/useEventBus'
import { useScoreStore } from '~/composables/store/useScoreStore'

const { evenBustEmit } = useEventBus()
const { score, maxScore } = storeToRefs(useScoreStore())

const onNewGame = () => {
  evenBustEmit(EVENT_BUS_MESSAGES.NEW_GAME)
}
</script>

<template>
  <section ref="header" class="header flex items-start justify-between h-[128px] mb-8" v-bind="$attrs">
    <div class="header__left flex flex-col justify-start items-start text-left">
      <span class="header__logo mb-2 text-display text-typography-dark text-7xl font-bold">
        2048
      </span>
      <span class="text-display text-typography-dark text-body">
        Join the tiles, get to 2048!
        <br />
        <a href="/" class="underline">How to play?</a>
      </span>
    </div>
    <div class="header__left flex flex-col justify-end items-center">
      <div class="header__left__score flex justify-end items-center gap-2 mb-4">
        <Score :value="score" />
        <Score :value="maxScore" />
      </div>
      <div class="header__left__new-game flex justify-end items-end gap-2 w-full">
        <Button class="w-[120px] font-bold" variant="filled" color="primary" flair="soft" @click="onNewGame">
          New game
        </Button>
      </div>
    </div>
  </section>
</template>
