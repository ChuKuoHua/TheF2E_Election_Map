// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: '2023 F2E - 2020 總統大選',
      meta: [
        {
          name: 'description',
          content:
            '作品為 2020 的總統大選，以全國、縣市、區域、鄉里四大層面來檢視票數，讓使用者可以透過直覺的搜尋方式了解自己居住地區的投票情形！'
        },
        {
          name: 'keywords',
          content: '選舉地圖, 台灣選舉地圖, 2023 F2E - 2020 總統大選, SKY-選舉地圖, 2020 總統大選'
        },
        { name: 'author', content: 'Yilee, KuoHua, Gloria su' }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/crown.svg' }]
    }
  },
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
