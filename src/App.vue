<script setup lang="ts">
import { useMeta } from '~/composables/useMeta'

// USE
useMeta({
  title: '2048',
  description: 'Gioca a 2048',
})
</script>

<template>
  <SplashScreen />
  <router-view class="h-full w-full flex flex-1 justify-center font-body" />
</template>