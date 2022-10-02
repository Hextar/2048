<script setup lang="ts">
// PROPS
const props = defineProps({
  reverse: { default: false, type: Boolean },
  horizontal: { default: false, type: Boolean }
})

// COMPUTED
const flexDirection = computed(() => props.horizontal ? 'row' : 'col')
</script>

<template>
  <div class="paragraph flex-col" :class="{}" v-bind="$attrs">
    <slot name="title" />
    <div class="sm:inline-block flex gap-8 items-center sm:items-start flex-col text-justify"
      :class="{ [`sm:flex-${flexDirection}`]: !props.reverse, [`sm:flex-${flexDirection}-reverse`]: props.reverse }">
      <slot />
    </div>
  </div>
</template>