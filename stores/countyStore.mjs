import { getCounties } from '@/api/election.mjs'

export const useCountyStore = defineStore('counties', () => {
  const county = ref('')
  const countyGetter = computed(() => county.value)
  const getCountiesData = async () => {
    await nextTick()
    const { data } = await getCounties()
    return data._value
  }

  return {
    county,
    countyGetter,
    getCountiesData
  }
})
