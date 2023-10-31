export const useDistrictStore = defineStore('districts', () => {
  const districts = ref('') // 行政區
  const districtsGetter = computed(() => districts.value || '')
  const votesData = ref([]) // 行政區投票資料
  const votesGetter = computed(() => votesData.value || [])
  const setDistricts = (payload) => {
    districts.value = payload
  }
  const setVotesData = (payload) => {
    votesData.value = payload
  }

  return {
    districts,
    districtsGetter,
    votesData,
    votesGetter,
    setVotesData,
    setDistricts
  }
})
