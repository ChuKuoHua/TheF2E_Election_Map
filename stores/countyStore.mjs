import { getCounties } from '@/api/election.mjs'

export const useCountyStore = defineStore('counties', () => {
  const county = ref('')
  const countyGetter = computed(() => county.value || '中央')
  const getCountiesData = async () => {
    return await getCounties()
  }

  return {
    county,
    countyGetter,
    getCountiesData
  }
})
