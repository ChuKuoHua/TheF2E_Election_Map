export const useCandidateStore = defineStore('candidates', () => {
  const candidates = ref('')
  const candidatesGetter = computed(() => candidates.value || '')
  const setCandidates = (payload) => {
    candidates.value = payload
  }

  return {
    candidates,
    candidatesGetter,
    setCandidates
  }
})
