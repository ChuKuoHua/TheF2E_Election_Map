// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/main.scss'],
  modules: ['@pinia/nuxt', '@nuxt/content', 'nuxt-lodash', '@nuxt/ui'],
  build: {
    transpile: [/echarts/]
  },
  pinia: {
    autoImports: [
      'defineStore' // import { defineStore } from 'pinia'
    ]
  }
})
