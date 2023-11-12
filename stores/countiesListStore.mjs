import { getCounties } from '@/api/election.mjs'

export const useCountiesListStore = defineStore('countiesList', () => {
  const counties = ref('')

  // 撈出所有縣市
  const countiesGetter = computed(() => counties.value)
  const fetchCountiesList = async () => {
    counties.value = await getCounties()
  }

  return {
    counties,
    countiesGetter,
    fetchCountiesList
  }
})
