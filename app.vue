<template>
  <div :class="[{ 'overflow-hidden max-h-screen': loading }]">
    <NuxtPage />
    <Transition name="fade">
      <page-loading-component v-show="loading" />
    </Transition>
    <navbar ref="navbarRef" />
    <footer class="bg-main-700 text-white py-14 tracking-widest">
      <div class="flex justify-between flex-wrap items-center w-3/4 mx-auto">
        <div class="w-full md:w-3/6 text-center sm:text-left mb-10 md:mb-0">
          <p>The F2E <span class="text-2xl">5</span>th 前端 & UI 修練精神時光屋</p>
        </div>
        <div class="w-full md:w-1/6 mb-10 md:mb-0 text-center flex justify-center">
          <div class="w-1/4 md:w-full">
            <p class="border-b-2 border-main-400">團隊名稱</p>
            <p>SKY</p>
          </div>
        </div>
        <div class="w-full md:w-2/6 flex justify-center md:justify-end">
          <ul class="text-main-100">
            <li class="flex py-1">
              <p class="mr-3 w-32">/ 前端工程師</p>
              <p>Yilee</p>
            </li>
            <li class="flex py-1">
              <p class="mr-3 w-32">/ 前端工程師</p>
              <p>Kuohua</p>
            </li>
            <li class="flex py-1">
              <p class="mr-3 w-32">/ UI工程師</p>
              <p>Gloria su</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
definePageMeta({
  layout: 'theFooter'
})
const pageLoadingStore = usePageLoadingStore()
const countyElectionStore = useCountyElectionStore()
const { loading } = storeToRefs(pageLoadingStore)
const candidateStore = useCandidateStore()

const fetchCandidate = async () => {
  const { data } = await useAsyncData('/', () => queryContent('/candidate').find())
  candidateStore.setCandidates(data.value[0].body)
}

const fetchData = async () => {
  pageLoadingStore.changeLoadingStatus(true)
  await countyElectionStore.fetchCountiesList()
  await fetchCandidate()
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
