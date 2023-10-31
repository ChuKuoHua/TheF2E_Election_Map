<template>
  <div class="flex justify-center">
    <div :id="props.id" ref="elChart" class="chart w-full h-80"></div>
  </div>
</template>

<script setup>
import { getCountyElection } from '@/api/election.mjs'
import { useSetBaseChart } from '@/composables/baseChart.mjs'
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { useDistrictStore } from '@/stores/district.mjs'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const candidateStore = useCandidateStore()
const districtStore = useDistrictStore()
const route = useRoute()
const xAxisData = ref([])
const elChart = ref(null)
const chart = ref(null)
const yAxisData = ref([])
const electionNumberArray = ref([])
const county = ref(route.params.countyid || '中央')
const districtsGetter = computed(() => districtStore.districtsGetter || '')
const color = ['#f68d55', '#6b6be4', '#76bc89']
// 取得候選人資料
const candidateList = computed(() => candidateStore.candidatesGetter)

// NOTE 初始事件
const initHandle = () => {
  switch (props.type) {
    case 'county':
      /**
       * $subscribe 監聽 pinia state 是否已取得資料
       * 如果沒加上 $subscribe 監聽，第一次進來會回傳 null
       * 這邊監聽 api 是否已取得資料給 state，如果撈到資料就觸發事件
       */
      candidateStore.$subscribe(() => {
        getData()
      })
      // 如果 candidateList 已有值就執行事件
      if (Object.keys(candidateList.value).length > 0) {
        getData()
      }
      break
    case 'district':
      // 監聽 districtStore 的 state 是否已取得資料
      districtStore.$subscribe(() => {
        getData()
      })
      if (Object.keys(districtsGetter.value).length > 0) {
        getData()
      }
      break
    default:
      break
  }
}
// NOTE 整理圖表資料
const chartOptionData = (data) => {
  yAxisData.value = []
  xAxisData.value = []
  electionNumberArray.value = []
  for (const key in data) {
    if (key !== districtsGetter.value && key !== '總　計') {
      xAxisData.value.push(key)
      electionNumberArray.value.push(data[key])
    }
  }

  const transformedData = useMap(electionNumberArray.value, (obj) => {
    return useMap(obj, (value) => parseInt(value.split(',').join('')))
  })
  const result = useZip(...transformedData)

  result.forEach((item, index) => {
    yAxisData.value.push({
      data: item,
      type: 'bar',
      name: candidateList.value[`electionGroups${index + 1}`]?.[0],
      color: color[index]
    })
  })
}

const getData = async () => {
  let title = ''

  // 取得縣市資料
  if (county.value === '中央') {
    title = '各縣市政黨得票數'
    const countiesData = await getCountyElection(county.value)
    await chartOptionData(countiesData)
  } else {
    title = '各行政區得票數'
    const districtData = await getCountyElection(county.value)
    await chartOptionData(districtData)
  }
  chart.value = useSetBaseChart(elChart.value, title, xAxisData.value, yAxisData.value, true)
}

onMounted(() => {
  initHandle()
})
</script>

<style lang="scss" scoped></style>
