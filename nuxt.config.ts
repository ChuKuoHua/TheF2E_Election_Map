// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  css: ['~/assets/main.scss'],
  modules: ['@pinia/nuxt', '@nuxt/content', 'nuxt-lodash'],
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
