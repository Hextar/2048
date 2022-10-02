<script setup lang="ts">
defineProps({
  value: { default: 0, type: [Number, String] }
})
</script>

<template>
  <div class="score flex flex-col justify-center bg-secondary py-1 px-6 rounded-md">
    <span class="score__label text-sm text-typography-light text-description">
      SCORE
    </span>
    <span class="score__value text-2xl text-typography-light font-bold text-center">
      {{ value }}
    </span>
  </div>
</template>