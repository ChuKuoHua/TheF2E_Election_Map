<template>
  <div>
    <button
      class="border border-main-700 rounded-lg hover:text-white p-3 mt-6 mb-10 md:my-6 mr-6 flex items-center float-right comeback"
      type="button"
      @click="comeback"
    >
      <div class="arrow mr-2"></div>
      返回全台統計
    </button>
    <div class="clear-both"></div>
    <div class="w-3/4 md:w-11/12 m-auto md:mr-0 md:ml-auto py-3 flex justify-between items-center">
      <div class="w-2/4 md:w-3/6 h-1 bg-main-700 relative">
        <div class="triangle_icon absolute top-0 left-0 hidden md:block"></div>
        <h1
          class="absolute -top-12 lg:-top-16 md:left-24 py-2 bg-dpp w-3/4 md:w-1/4 lg:w-1/5 text-center text-xl text-white tracking-widest"
        >
          {{ county }}
        </h1>
        <div
          class="absolute -top-1.5 right-0 bottom-0 rounded-full bg-main-700 h-4 w-4 hidden md:block"
        ></div>
      </div>
      <div class="w-2/4 md:w-1/4 lg:w-1/6">
        <h2 class="text-4xl text-right md:text-center tracking-widest">TAIWAN</h2>
      </div>
      <div class="w-2/6 hidden md:block md:w-1/4 h-1 bg-main-700"></div>
    </div>
    <div class="bg-main-800 relative">
      <div class="absolute top-0 right-8">
        <svg width="400" height="300">
          <defs>
            <pattern id="rect-pattern" width="10" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="10" width="150" height="12" fill="#B8B8B830" />
            </pattern>
          </defs>
          <circle
            cx="250"
            cy="70"
            r="150"
            fill="url(#rect-pattern)"
            transform="rotate(-45 150 40)"
          />
        </svg>
      </div>
      <div class="pt-20 relative z-30">
        <div class="w-full lg:w-5/6 mx-auto flex flex-wrap">
          <div class="mb-3 w-full lg:w-3/5 md:mx-6 lg:mx-0">
            <chartComponent :id="'districtChart'" :type="'district'" />
          </div>
          <div class="w-full lg:w-2/5 px-6 lg:px-3">
            <countyListComponent />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-5/6 mx-auto flex flex-wrap mt-10 relative z-30">
      <div class="w-full lg:w-2/5 mx-6 lg:mx-0">
        <pieChartComponent :id="'districtPieChart'" />
      </div>
      <div class="w-full lg:w-3/5 px-4 lg:px-1 mb-5 lg:mb-3">
        <div class="py-3 border border-white flex items-center justify-between">
          <p class="mr-3 text-lg">各鄉鎮市區得票概況</p>
          <div class="w-2/5 lg:w-1/5">
            <selectComponent />
          </div>
        </div>
        <areaTableComponent />
        <p class="mt-6 text-lg mb-3">各村里得票率</p>
        <tableComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import countyListComponent from '@/components/county/listComponent.vue'
import selectComponent from '@/components/district/selectComponent.vue'
import areaTableComponent from '@/components/district/tableComponent.vue'
import tableComponent from '@/components/village/tableComponent.vue'
import chartComponent from '@/components/echart/baseChartComponent.vue'
import pieChartComponent from '@/components/echart/pieChartComponent.vue'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'

const pageLoadingStore = usePageLoadingStore()
const districtStore = useDistrictStore()
const router = useRouter()
const route = useRoute()
const county = ref(route.params.countyid)
const district = computed(() => districtStore.districtGetter)

const comeback = () => {
  router.push({ path: `/` })
}

definePageMeta({
  middleware: 'auth'
})

useAsyncData(async () => {
  await districtStore.fetchDistrictElection(county.value)
})
useAsyncData(
  'district',
  async () => {
    pageLoadingStore.pageLoading = true
    if (district.value) {
      await districtStore.fetchTownshipElection(county.value, district.value)
      pageLoadingStore.pageLoading = false
    }
  },
  {
    watch: [district]
  }
)

onMounted(() => {})
</script>

<style lang="scss" scoped>
.comeback {
  position: relative;
  overflow: hidden;
  &::after {
    position: absolute;
    content: '';
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    border-radius: 7px;
    background-color: #344340;
    transition: all 0.3s ease;
  }
  &:hover {
    &::after {
      width: 100%;
    }
    .arrow {
      background-color: white;
      &::before {
        background-color: white;
      }
    }
  }
}
.arrow {
  width: 47.887px;
  height: 2px;
  background-color: #344340;
  position: relative;
  &::before {
    content: '';
    width: 10px;
    height: 2px;
    background-color: #344340;
    position: absolute;
    left: 0px;
    top: -3px;
    transform: rotate(145deg);
  }
}
</style>
