<template>
  <div :class="[{ 'overflow-hidden max-h-screen': loading }]">
    <ul class="flex py-3 mb-3">
      <li>
        <NuxtLink class="bg-red-300 p-3 text-white" to="/">首頁</NuxtLink>
      </li>
    </ul>
    <NuxtPage />
    <Transition name="fade">
      <page-loading-component v-show="loading" />
    </Transition>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'

const pageLoadingStore = usePageLoadingStore()
const { loading } = storeToRefs(pageLoadingStore)

const candidateStore = useCandidateStore()

onMounted(() => {
  candidateStore.setCandidates()
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
