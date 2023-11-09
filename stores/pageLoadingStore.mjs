export const usePageLoadingStore = defineStore('pageLoading', () => {
  const loading = ref(false)
  const appLoading = ref(false)
  const pageLoading = ref(false)
  let loadingStartTime = null

  const changeLoadingStatus = (status) => {
    if (status) {
      loadingStartTime = Date.now() // 計時
      loading.value = true
    } else {
      const elapsedTime = Date.now() - (loadingStartTime || 0)
      const minimumDelay = 1500 // 最少維持秒數

      if (elapsedTime < minimumDelay) {
        // 未滿秒數，延遲處理
        const remainingTime = minimumDelay - elapsedTime

        setTimeout(() => {
          loading.value = false
        }, remainingTime)
      } else {
        loading.value = false
      }
    }
  }

  // 判斷 loading 是否變更
  const showLoading = computed(() => appLoading.value || pageLoading.value)
  watch(showLoading, (newValue) => {
    changeLoadingStatus(newValue)
  })

  return { loading, appLoading, pageLoading }
})
