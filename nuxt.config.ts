// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/main.scss'],
  modules: ['@pinia/nuxt', '@nuxt/content', 'nuxt-lodash', '@nuxt/ui'],
  build: {
    transpile: [/echarts/]
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || ''
    }
  },
  pinia: {
    autoImports: [
      'defineStore' // import { defineStore } from 'pinia'
    ]
  }
})
