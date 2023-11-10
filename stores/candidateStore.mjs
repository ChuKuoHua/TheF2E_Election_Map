import { getElectionGroups } from '@/api/election.mjs'
export const useCandidateStore = defineStore('candidates', () => {
  const candidates = ref('')
  const candidatesGetter = computed(() => candidates.value || '')
  const setCandidates = async () => {
    candidates.value = await getElectionGroups()
  }

  return {
    candidates,
    candidatesGetter,
    setCandidates
  }
})
