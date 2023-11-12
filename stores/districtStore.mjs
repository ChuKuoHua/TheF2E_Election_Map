export const useDistrictStore = defineStore('districts', () => {
  const district = ref('') // 行政區
  const districtGetter = computed(() => district.value || '')
  const township = ref('')
  const townshipGetter = computed(() => township.value || '')
  const votesData = ref([]) // 行政區投票資料
  const votesGetter = computed(() => votesData.value || [])
  const setDistrict = (payload) => {
    district.value = payload
  }
  const setVotesData = (payload) => {
    payload.sort((a, b) => b.rate - a.rate)
    votesData.value = payload
  }

  const fetchTownshipElection = async (countyName, district) => {
    township.value = await getTownshipElection(countyName, district)
  }

  return {
    district,
    districtGetter,
    township,
    townshipGetter,
    votesData,
    votesGetter,
    setVotesData,
    setDistrict,
    fetchTownshipElection
  }
})
