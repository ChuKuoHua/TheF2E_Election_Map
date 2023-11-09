export const useCandidateStore = defineStore('candidates', () => {
  const candidates = ref('')
  const candidatesGetter = computed(() => candidates.value || '')
  const setCandidates = async () => {
    const { data } = await useAsyncData('/', () => queryContent('candidate').find())
    candidates.value = data.value[0].body
  }

  return {
    candidates,
    candidatesGetter,
    setCandidates
  }
})
