import { getElectionGroups, getCounties } from '@/api/election.mjs'
export const useCandidateAndCountyStore = defineStore('candidatesAndCounty', () => {
  const candidates = ref('')
  const counties = ref('')
  const candidatesGetter = computed(() => candidates.value || '')
  const countiesGetter = computed(() => counties.value)
  const fetchCandidatesAndCounties = async () => {
    const [candidatesData, countiesData] = await Promise.all([getElectionGroups(), getCounties()])
    candidates.value = candidatesData
    counties.value = countiesData
  }

  return {
    candidates,
    candidatesGetter,
    counties,
    countiesGetter,
    fetchCandidatesAndCounties
  }
})
