<template>
  <div class="mx-10 md:mx-0">
    <p class="text-center text-main-700">{{ chartTitle }}</p>
    <div :id="props.id" ref="elPieChart" class="w-full lg:h-96 h-64"></div>
    <ul>
      <li v-for="item of districtsData" :key="item.president">
        <div class="flex justify-center">
          <div class="w-3/4 md:w-full lg:w-2/4 px-3 md:px-8">
            <p
              class="py-1 text-xl border-l-8 mb-3 pl-5"
              :class="{
                'border-pfp': item.president === '宋楚瑜',
                'border-kmt': item.president === '韓國瑜',
                'border-dpp': item.president === '蔡英文'
              }"
            >
              {{ item.president }} /
              {{ item.vicePresident }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useSetPieChart } from '@/composables/pieChart.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const districtStore = useDistrictStore()
const route = useRoute()
const county = ref(route.params.countyid)
const xAxisData = ref([])
const elPieChart = ref(null)
const chart = ref(null)
const yAxisData = ref([])
const color = {
  electionGroups1: '#F2854A',
  electionGroups2: '#62A0D5',
  electionGroups3: '#58AC6F'
}
// 取得行政區資料
const districtsData = computed(() => districtStore.votesGetter)
const district = computed(() => districtStore.districtGetter)
const chartTitle = ref('')
// NOTE 初始事件
const initHandle = () => {
  districtStore.$subscribe(() => {
    getData()
  })
  if (Object.keys(districtsData.value).length > 0) {
    getData()
  }
}

const getData = () => {
  chartTitle.value = `${county.value}${district.value}`
  yAxisData.value = districtsData.value.map((item) => {
    return {
      name: `${item.rate}%`,
      value: item.rate,
      itemStyle: {
        color: color[item.id]
      },
      label: {
        position: item.rate > 30 ? 'inside' : '',
        color: item.rate > 30 ? 'white' : color[item.id],
        fontSize: 16
      }
    }
  })
  xAxisData.value = districtsData.value.map((item) => `${item.president}/${item.vicePresident}`)
  // echart 生成圖表
  chart.value = useSetPieChart(elPieChart.value, chartTitle.value, yAxisData.value)
}

onMounted(() => {
  initHandle()
})
</script>

<style lang="scss" scoped></style>
