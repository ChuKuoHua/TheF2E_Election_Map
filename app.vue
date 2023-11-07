<template>
  <div :class="[{ 'overflow-hidden max-h-screen': loading }]">
    <NuxtPage />
    <Transition name="fade">
      <page-loading-component v-show="loading" />
    </Transition>
    <navbar ref="navbarRef"></navbar>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'

const pageLoadingStore = usePageLoadingStore()
const countyElectionStore = useCountyElectionStore()
const { loading } = storeToRefs(pageLoadingStore)
const candidateStore = useCandidateStore()
const fetchData = async () => {
  pageLoadingStore.changeLoadingStatus(true)
  await countyElectionStore.fetchCountiesList()
  await candidateStore.setCandidates()
  pageLoadingStore.changeLoadingStatus(false)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
