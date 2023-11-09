<template>
  <div class="flex justify-center">
    <div :id="props.id" ref="elPieChart" class="w-full h-96"></div>
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
const color = ['#58AC6F', '#62A0D5', '#F2854A']
// 取得行政區資料
const districtsData = computed(() => districtStore.votesGetter)
const district = computed(() => districtStore.districtGetter)

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
  const title = `${county.value}${district.value}`
  yAxisData.value = districtsData.value.map((item, index) => {
    return {
      name: `${item.rate}%`,
      value: item.rate,
      itemStyle: {
        color: color[index]
      },
      label: {
        position: item.rate > 30 ? 'inside' : '',
        color: item.rate > 30 ? 'white' : color[index],
        fontSize: 16
      }
    }
  })
  xAxisData.value = districtsData.value.map((item) => `${item.president}/${item.vicePresident}`)
  // echart 生成圖表
  chart.value = useSetPieChart(elPieChart.value, title, xAxisData.value, yAxisData.value)
}

onMounted(() => {
  initHandle()
})
</script>

<style lang="scss" scoped></style>
