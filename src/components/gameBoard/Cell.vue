<script setup lang="ts">
const props = defineProps({
  value: { default: 0, type: Number },
  top: { default: 0, type: Number },
  left: { default: 0, type: Number },
  cellSize: { default: 0, type: Number },
})

const style = computed<string>(() => {
  const deltaTop = props.top * 4
  const deltaLeft = props.left * 4
  return `
    width: calc(${props.cellSize}% - 12px);
    top: calc(${props.cellSize * props.top}% + ${deltaTop}px);
    left: calc(${props.cellSize * props.left}% + ${deltaLeft}px);
  `
})
</script>

<template>
  <div class="game__board__cell absolute flex justify-center items-center bg-tertiary aspect-square rounded-md"
    :class="`game__board__cell--${value}`" :style="style">
    <span class="game__board__cell__label animate__appear font-body text-5xl font-900 text-typography-dark">
      {{ value }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.game__board__cell {
  transition: all 150ms ease;

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
</style>
  