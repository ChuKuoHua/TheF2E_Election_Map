import { getCounties } from '@/api/election.mjs'

export const useCountyStore = defineStore('counties', () => {
  const county = ref('')
  const countyGetter = computed(() => county.value || '')
  const getCountiesData = async () => {
    const { value } = await getCounties()
    return value
  }

  return {
    county,
    countyGetter,
    getCountiesData
  }
})
