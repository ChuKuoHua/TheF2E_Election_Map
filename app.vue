<template>
  <div :class="[{ 'overflow-hidden max-h-screen': loading }]">
    <div class="absolute right-0 lg:right-auto lg:left-0 bg-main-800 z-10">
      <button type="button" class="p-3" @click="openMenu">
        <svg class="w-6 h-6 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 17 14">
          <path
            d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1
            1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z"
          ></path>
        </svg>
      </button>
    </div>
    <NuxtPage :class="[{ 'opacity-0': loading }]" />
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
const navbarRef = ref(null)
const openMenu = () => {
  navbarRef.value.onClick()
}
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
