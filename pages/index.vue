<template>
  <div class="bg-[#F6F6F6] min-h-screen taiwan-page flex items-center justify-center gap-8 py-10">
    <div>
      <title-component />
      <home-list-component :nationwide-votes="totalVotes" />
    </div>
    <taiwan-map-component :counties-voting-winner-list="countiesVotingWinner" />
  </div>
</template>

<script setup>
import HomeListComponent from '@/components/county/homeListComponent.vue'
import TaiwanMapComponent from '@/components/taiwanMap/taiwanMapComponent.vue'
import TitleComponent from '@/components/common/titleComponent.vue'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import { useCandidateAndCountyStore } from '@/stores/candidateAndCountyStore.mjs'
import { rateHandle, numberToChinese, removeComma } from '@/utils/tools.mjs'

// 頁面所需api
const pageLoadingStore = usePageLoadingStore()
const countyElectionStore = useCountyElectionStore()
const candidateAndCountyStore = useCandidateAndCountyStore()

useAsyncData(async () => {
  pageLoadingStore.pageLoading = true
  await countyElectionStore.fetchCountyElection('中央')
  pageLoadingStore.pageLoading = false
})

// 總計票數
const totalVotes = computed(() => {
  const total = countyElectionStore.countyElectionData['總　計'] || {}
  // 取得候選人資料
  const candidateList = useCloneDeep(candidateAndCountyStore.candidates)

  if (isEmpty(total) || !candidateList.length) return []

  candidateList.map((group) => {
    group.percent = rateHandle(total, total[group.id])
    group.votes = removeComma(total[group.id])
    group.votesFormat = numberToChinese(group.votes).replace(/\s/g, '')
    return group
  })
  return candidateList.sort((a, b) => a.votes - b.votes)
})

// 22縣市票數獲勝者判斷
const countiesVotingWinner = computed(() => {
  const maxValues = {}

  for (const city in countyElectionStore.countyElectionData) {
    const cityData = countyElectionStore.countyElectionData[city]
    let maxKey = null
    let maxValue = -Infinity

    for (const key in cityData) {
      const value = removeComma(cityData[key])
      if (value > maxValue) {
        maxValue = value
        maxKey = key
      }
    }
    maxValues[city] = maxKey
  }
  return maxValues
})
</script>
<style scoped lang="scss">
.taiwan-page :deep(svg) {
  path {
    stroke: white;
  }

  path:hover,
  path.active,
  rect:hover {
    transform: translate(-1px, -2px);
    filter: brightness(0.9);
    cursor: pointer;
  }
}
</style>
