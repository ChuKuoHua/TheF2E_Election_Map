// NOTE 取得鄉鎮投票數
export async function getTownshipElection(county, village) {
  return await nextTick(async () => {
    const { data } = await useFetch(
      `${useRuntimeConfig().public.API_BASE_URL}?county=${county}&area=${village}`
    )
    return data
  })
}
// NOTE 取得縣市投票數
export async function getCountyElection(county) {
  return await nextTick(async () => {
    const { data } = await useFetch(`${useRuntimeConfig().public.API_BASE_URL}?county=${county}`)
    return data
  })
}
// NOTE 取得各縣市
export async function getCounties() {
  return await nextTick(async () => {
    const { data } = await useFetch(`${useRuntimeConfig().public.API_BASE_URL}?search=counties`)
    return data
  })
}
// NOTE 取得所有選舉人
export async function getElectionGroups() {
  return await nextTick(async () => {
    const { data } = await useFetch(
      `${useRuntimeConfig().public.API_BASE_URL}?search=electionGroups`
    )
    return data
  })
}
