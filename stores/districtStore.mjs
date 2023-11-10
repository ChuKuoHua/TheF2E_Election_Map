import { getTownshipElection } from '@/api/election.mjs'

export const useDistrictStore = defineStore('districts', () => {
  const district = ref('') // 行政區
  const districtGetter = computed(() => district.value || '')
  const townshipData = ref('')
  const townshipDataGetter = computed(() => townshipData.value || [])
  const votesData = ref([]) // 行政區投票資料
  const votesGetter = computed(() => votesData.value || [])
  const setDistrict = (payload) => {
    district.value = payload
  }
  const setVotesData = (payload) => {
    payload.sort((a, b) => b.rate - a.rate)
    votesData.value = payload
  }
  const setTownshipData = async (county, district) => {
    townshipData.value = await getTownshipElection(county, district)
  }

  return {
    district,
    districtGetter,
    townshipData,
    townshipDataGetter,
    votesData,
    votesGetter,
    setVotesData,
    setDistrict,
    setTownshipData
  }
})
