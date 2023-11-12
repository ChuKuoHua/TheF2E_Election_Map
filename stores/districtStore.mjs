import { getCountyElection, getTownshipElection } from '@/api/election.mjs'
export const useDistrictStore = defineStore('districts', () => {
  const district = ref('') // 單一行政區
  const districtGetter = computed(() => district.value || '')
  const township = ref('') // 村里
  const townshipGetter = computed(() => township.value || '')
  const votesData = ref([]) // 單一行政區投票資料
  const votesGetter = computed(() => votesData.value || [])
  const districtList = ref([]) // 所有行政區投票資料
  const districtListGetter = computed(() => districtList.value || [])
  const districtOptions = ref([]) // 所有行政區
  const districtOptionsGetter = computed(() => districtOptions.value || [])
  const setDistrict = (payload) => {
    district.value = payload
  }
  const setVotesData = (payload) => {
    payload.sort((a, b) => b.rate - a.rate)
    votesData.value = payload
  }
  const fetchDistrictElection = async (countyName) => {
    districtList.value = await getCountyElection(countyName)
    districtOptions.value = Object.keys(districtList.value).filter((item) => item !== '總　計')
    district.value = Object.keys(districtList.value)[1]
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
    districtList,
    districtListGetter,
    districtOptions,
    districtOptionsGetter,
    fetchDistrictElection,
    setVotesData,
    setDistrict,
    fetchTownshipElection
  }
})
