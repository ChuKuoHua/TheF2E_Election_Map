<template>
  <div
    class="fixed top-0 bottom-0 w-full h-full bg-main-800 opacity-20 z-30"
    :class="{ hidden: isClose }"
    @click="onClick"
  ></div>
  <div
    class="fixed top-0 right-0 bottom-0 z-40 p-2 md:p-4 bg-main-800 text-white w-lg transition-all duration-500 ease-in-out overflow-y-auto"
    tabindex="-1"
    :class="{ '-right_640': isClose }"
  >
    <div class="px-3 lg:px-16">
      <button
        type="button"
        data-drawer-hide="drawer-example"
        aria-controls="drawer-example"
        class="opacity-60 bg-transparent hover:opacity-100 rounded-full text-lg w-8 h-8 inline-flex items-center justify-center border mt-3 md:mt-12 mb-5 md:mb-10 mr-1.5 float-right"
        @click="onClick"
      >
        <svg class="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <div class="flex flex-wrap justify-center md:justify-end clear-both">
        <NuxtLink
          v-for="item of countiesList"
          :key="item"
          :to="`/${item}`"
          class="w-32 lg:w-36 text-center p-2 m-2 border border-white text-xl opacity-60 bg-transparent hover:opacity-100"
        >
          {{ item }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCandidateAndCountyStore } from '@/stores/candidateAndCountyStore.mjs'

const route = useRoute()
const candidateAndCountyStore = useCandidateAndCountyStore()
const countiesList = computed(() => candidateAndCountyStore.counties)
const isClose = ref(true)

const onClick = () => {
  isClose.value = !isClose.value
}

defineExpose({ onClick })

watch(
  () => route.fullPath,
  () => {
    isClose.value = true
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {})
</script>

<style lang="scss" scoped>
.w-lg {
  width: 640px;
}

.-right_640 {
  right: -999px;
}

@media (max-width: 640px) {
  .w-lg {
    width: 100%;
  }
}
</style>
