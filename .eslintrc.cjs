module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'prettier',
    './.eslintrc-auto-import.json'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', 'nuxt', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/no-textarea-mustache': 'off',
    // 'vue/multi-word-component-names': 0, // 針對檔案取名報錯的規則關閉
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index']
      }
    ],
    'no-undef': 'off'
  }
}
