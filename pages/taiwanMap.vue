<template>
  <div class="taiwan-page flex flex-wrap items-center justify-center">
    <taiwanMapComponent :counties-voting-winner-list="countiesVotingWinner" />
  </div>
</template>
<script setup>
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'

const pageLoadingStore = usePageLoadingStore()
const countyElectionStore = useCountyElectionStore()

async function fetchData() {
  pageLoadingStore.pageLoading = true
  await countyElectionStore.fetchCountyElection('中央')
  pageLoadingStore.pageLoading = false
}

// 22縣市票數獲勝者判斷
const countiesVotingWinner = computed(() => {
  const maxValues = {}

  for (const city in countyElectionStore.countyElectionData) {
    const cityData = countyElectionStore.countyElectionData[city]
    let maxKey = null
    let maxValue = -Infinity

    for (const key in cityData) {
      const value = parseFloat(cityData[key].replace(/,/g, '')) // 去除逗號並轉number
      if (value > maxValue) {
        maxValue = value
        maxKey = key
      }
    }

    maxValues[city] = maxKey
  }

  return maxValues
})

onMounted(() => {
  fetchData()
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
