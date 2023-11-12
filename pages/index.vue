<template>
  <div class="bg-[#F6F6F6] min-h-screen">
    <home-list-component :nationwide-votes="totalVotes" />
  </div>
</template>

<script setup>
import HomeListComponent from '@/components/county/homeListComponent.vue'
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
    group.votesFormat = numberToChinese(group.votes)
    return group
  })
  return candidateList.sort((a, b) => a.votes - b.votes)
})
</script>
