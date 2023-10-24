<template>
  <div>
    <div class="flex justify-center">
      <div id="testChart" ref="elChart" class="chart w-full md:w-3/4 h-80"></div>
    </div>
  </div>
</template>

<script setup>
import { getCountyElection, getElectionGroups } from '@/api/election.mjs'
import { useSetLBaseChart } from '@/composables/baseChart.mjs'
import { useCountyStore } from '@/stores/countyStore.mjs'

const countyStore = useCountyStore()
const xAxisData = ref([])
const elChart = ref(null)
const chart = ref(null)
const yAxisData = ref([])
const electionNumberArray = ref([])
const countyGetter = computed(() => countyStore.countyGetter || '臺南市')
const color = ['#f68d55', '#6b6be4', '#76bc89']
const getData = async () => {
  yAxisData.value = []
  xAxisData.value = []
  electionNumberArray.value = []
  // 取得縣市資料
  const election = await getCountyElection(countyGetter.value)
  // 取得候選人資料
  const candidateList = await getElectionGroups()
  const electionData = election._value
  for (const key in electionData) {
    if (key !== '總　計') {
      xAxisData.value.push(key)
      electionNumberArray.value.push(electionData[key])
    }
  }
  const transformedData = useMap(electionNumberArray.value, (obj) => {
    return useMap(obj, (value) => parseInt(value.replace(',', '')))
  })
  const result = useZip(...transformedData)

  result.forEach((item, index) => {
    yAxisData.value.push({
      data: item,
      type: 'bar',
      name: candidateList.value[`electionGroups${index + 1}`][0],
      color: color[index]
    })
  })

  chart.value = useSetLBaseChart(
    elChart.value,
    '各縣市政黨得票數/得票率',
    xAxisData.value,
    yAxisData.value,
    true
  )
}
watch(
  countyGetter,
  (name) => {
    if (name) {
      getData()
    }
  },
  { deep: true }
)
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>
