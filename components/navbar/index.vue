<template>
  <div
    id="drawer-example"
    class="fixed top-0 right-0 z-10 h-screen p-4 bg-main text-white w-lg transition-all duration-500 ease-in-out overflow-y-auto"
    tabindex="-1"
    aria-labelledby="drawer-label"
    :class="{ '-right_640': isClose }"
  >
    <div class="px-16">
      <button
        type="button"
        data-drawer-hide="drawer-example"
        aria-controls="drawer-example"
        class="opacity-60 bg-transparent hover:opacity-100 rounded-full text-lg w-8 h-8 inline-flex items-center justify-center border mt-12 mb-10 mr-1.5 float-right"
        @click="onClick"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
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
      <div class="flex flex-wrap justify-end clear-both">
        <div
          v-for="item of countiesList"
          :key="item"
          class="w-36 text-center m-2 border border-white text-xl"
        >
          <button type="button" class="w-full p-2 opacity-60 bg-transparent hover:opacity-100">
            {{ item }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'

const countyElectionStore = useCountyElectionStore()
const countiesList = ref('')
const isClose = ref(true)

const onClick = () => {
  isClose.value = !isClose.value
}

defineExpose({ onClick })
onMounted(() => {
  countyElectionStore.$subscribe(() => {
    countiesList.value = countyElectionStore.counties.filter((item) => item !== '總　計')
  })
})
</script>

<style lang="scss" scoped>
.w-lg {
  width: 640px;
}
.-right_640 {
  right: -640px;
}
</style>
