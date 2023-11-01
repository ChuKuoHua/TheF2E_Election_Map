import { getElectionGroups } from '@/api/election.mjs'
export const useCandidateStore = defineStore('candidates', () => {
  const candidates = ref('')
  const candidatesGetter = computed(() => candidates.value || '')
  const setCandidates = async () => {
    const data = await getElectionGroups()
    candidates.value = data
  }

  return {
    candidates,
    candidatesGetter,
    setCandidates
  }
})
