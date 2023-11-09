<template>
  <div :class="[{ 'overflow-hidden max-h-screen': loading }]">
    <NuxtPage />
    <Transition name="fade">
      <pageLoadingComponent v-show="loading" />
    </Transition>
    <navbar ref="navbarRef" />
    <footer-component />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
import FooterComponent from '@/components/common/footerComponent.vue'
import PageLoadingComponent from '@/components/common/pageLoadingComponent.vue'

const pageLoadingStore = usePageLoadingStore()
const countyElectionStore = useCountyElectionStore()
const { loading } = storeToRefs(pageLoadingStore)
const candidateStore = useCandidateStore()

const fetchData = async () => {
  pageLoadingStore.appLoading = true
  await countyElectionStore.fetchCountiesList()
  candidateStore.setCandidates()
  pageLoadingStore.appLoading = false
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
