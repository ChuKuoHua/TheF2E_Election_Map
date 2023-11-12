import { getCountyElection } from '@/api/election.mjs'

export const useCountyElectionStore = defineStore('countyElection', () => {
  const currentCounty = ref('')
  const countyElectionData = ref({})
  const countyVotesData = ref([]) // 各縣市總票數資料

  const fetchCountyElection = async (countyName) => {
    currentCounty.value = countyName
    countyElectionData.value = await getCountyElection(countyName)
  }

  // 縣市底下的區域(第二層)清單
  const countyAreas = computed(() => {
    return Object.keys(countyElectionData.value)
  })

  // 對應區域的結果
  const getCountyAreaData = function (areaName) {
    return countyElectionData.value[areaName] || null
  }

  const countyVotesDataGetter = computed(() => countyVotesData.value || [])
  const setCountyVotesData = (payload) => {
    payload.sort((a, b) => b.rate - a.rate)
    countyVotesData.value = payload
  }

  return {
    currentCounty,
    countyElectionData,
    countyVotesDataGetter,
    fetchCountyElection,
    countyAreas,
    getCountyAreaData,
    setCountyVotesData
  }
})
