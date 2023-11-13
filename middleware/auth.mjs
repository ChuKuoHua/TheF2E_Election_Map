import { useDistrictStore } from '@/stores/districtStore.mjs'
export default defineNuxtRouteMiddleware((to, from) => {
  const districtStore = useDistrictStore()
  if (from) {
    districtStore.setDistrict('')
  }
})
