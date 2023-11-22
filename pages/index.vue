<template>
  <div
    class="relative z-0 bg-none 2xl:bg-[url('/images/homeBg.svg?v=2')] bg-contain bg-no-repeat bg-[75vw] bg-main-800"
  >
    <div
      class="pt-[80px] pb-[40px] flex-col 2xl:flex-row bg-[#F6F6F6] 2xl:bg-transparent 2xl:bg-[linear-gradient(45deg,_#F6F6F6_70%,_transparent_70%)] min-h-screen taiwan-page flex items-center justify-center flex-wrap"
    >
      <div class="mr-0 2xl:-mr-6 transform -translate-y-10">
        <title-component class="px-5 2xl:px-0" />
        <home-list-component
          class="pr-0 2xl:pr-24"
          style="margin: 0"
          :nationwide-votes="totalVotes"
        />
      </div>
      <div style="max-width: 525px; max-height: 785px" class="w-full h-full relative">
        <div
          class="hidden 2xl:block absolute -z-[1] scale-110 w-full h-full border-2 border-solid rounded-full border-white"
        >
          <div class="white-circle right-[-7px]" style="top: calc(50% - 7px)"></div>
          <div class="white-circle top-[-7px]" style="right: calc(50% - 7px)"></div>
        </div>
        <taiwan-map-component
          v-model:hover-county-name="hoverCountyName"
          :counties-voting-winner-list="countiesVotingWinner"
          class="w-full h-full bg-[#F6F6F6] border-none 2xl:border-solid border-4 rounded-full border-main-900"
        />
      </div>
      <county-tool-tip
        v-show="hoverCountyName"
        :county-name="hoverCountyName"
        :county-votes="countyVotes"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import HomeListComponent from '@/components/county/homeListComponent.vue'
import TaiwanMapComponent from '@/components/taiwanMap/taiwanMapComponent.vue'
import TitleComponent from '@/components/common/titleComponent.vue'
import CountyToolTip from '@/components/taiwanMap/countyToolTip.vue'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import { useCandidateAndCountyStore } from '@/stores/candidateAndCountyStore.mjs'
import { rateHandle, numberToChinese, removeComma } from '@/utils/tools.mjs'

// 頁面所需api
const pageLoadingStore = usePageLoadingStore()
const countyElectionStore = useCountyElectionStore()
const candidateAndCountyStore = useCandidateAndCountyStore()
const { countyElectionData } = storeToRefs(countyElectionStore)

useAsyncData(async () => {
  pageLoadingStore.pageLoading = true
  await countyElectionStore.fetchCountyElection('中央')
  pageLoadingStore.pageLoading = false
})

const hoverCountyName = ref('')

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

// 某縣市的票數
const countyVotes = computed(() => {
  if (!hoverCountyName.value) return {}
  return countyElectionData.value[hoverCountyName.value] || {}
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
