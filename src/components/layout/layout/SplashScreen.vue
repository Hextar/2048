<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

// USE
const { t } = useI18n()

// VARIABLES
const visible: Ref<Boolean> = ref(true)
const hide: Ref<Boolean> = ref(false)

// ON MOUNTED
onMounted(() => {
  setTimeout(() => (hide.value = true), 600)
  setTimeout(() => (visible.value = false), 1200)
})
</script>

<template>
  <section v-if="visible" class="splash-screen firefox-bg flex items-center justify-center backdrop-blur"
    :class="{ 'splash-screen--hide': hide }">
    <span class="font-display text-3xl font-bold text-primary uppercase"> {{ t('common.loading') }} </span>
  </section>
</template>

<style lang="scss" scoped>
.splash-screen {
  position: absolute;
  @include fullsize;
  z-index: 999;
  opacity: 1;
  transition: opacity 0.255s ease-in-out;

  &--hide {
    opacity: 0;
  }
}
</style>
