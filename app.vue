<template>
  <div :class="[{ 'overflow-hidden max-h-screen': loading }]">
    <NuxtPage />
    <Transition name="fade">
      <page-loading-component v-show="loading" />
    </Transition>
    <navbar ref="navbarRef" />
    <footer-component />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCandidateAndCountyStore } from '@/stores/candidateAndCountyStore.mjs'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
import FooterComponent from '@/components/common/footerComponent.vue'
import PageLoadingComponent from '@/components/common/pageLoadingComponent.vue'

const pageLoadingStore = usePageLoadingStore()
const { loading } = storeToRefs(pageLoadingStore)
const candidateAndCountyStore = useCandidateAndCountyStore()

useAsyncData(async () => {
  pageLoadingStore.appLoading = true
  await candidateAndCountyStore.fetchCandidatesAndCounties()
  pageLoadingStore.appLoading = false
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
