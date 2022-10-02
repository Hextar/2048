<script setup lang="ts">
defineProps({
  fullWidth: { default: false, type: Boolean }
})
</script>

<template>
  <article class="article flex flex-col items-center justify-start bg-white-100 px-8" v-bind="$attrs">
    <div class="prose lg:prose-xl" :class="{ 'w-full': fullWidth }">
      <slot />
    </div>
  </article>
</template>
