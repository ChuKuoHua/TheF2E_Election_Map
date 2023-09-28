// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/main.scss'],
  modules: ['@pinia/nuxt', '@nuxt/content', 'nuxt-lodash'],
  build: {
    transpile: [/echarts/]
  }
})
