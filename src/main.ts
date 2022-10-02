import { createApp } from 'vue'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import '~/assets/styles/index.scss'
import 'uno.css'

// create app -----------
const app = createApp(App)

// i18n -----------------
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
const i18n = createI18n({ locale: 'en', messages })
app.use(i18n)

// pinia ---------------
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

// router --------------
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
const router = createRouter({
  routes: setupLayouts(generatedRoutes),
  history: createWebHistory()
})
app.use(router)

// useHead -------------
import { createHead } from "@vueuse/head"
const head = createHead()
app.use(head)

// mount ---------------
app.mount("#app")
