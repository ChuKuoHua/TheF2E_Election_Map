<template>
  <div class="flex justify-center md:mx-0">
    <div :id="props.id" ref="elChart" class="w-full h-96"></div>
  </div>
</template>

<script setup>
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import { useSetBaseChart } from '@/composables/baseChart.mjs'
import { useCandidateAndCountyStore } from '@/stores/candidateAndCountyStore.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { removeComma } from '@/utils/tools.mjs'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const candidateAndCountyStore = useCandidateAndCountyStore()
const countyElectionStore = useCountyElectionStore()
const districtStore = useDistrictStore()
const xAxisData = ref([])
const elChart = ref(null)
const chart = ref(null)
const yAxisData = ref([])
const electionNumberArray = ref([])
const districtGetter = computed(() => districtStore.districtGetter)
const color = ['#58AC6F', '#4889C1', '#F2854A']
// 取得候選人資料
const candidateList = computed(() => candidateAndCountyStore.candidatesGetter)
const router = useRouter()
const w = ref(0)

// NOTE 整理圖表資料
const chartOptionData = (data) => {
  yAxisData.value = []
  xAxisData.value = []
  electionNumberArray.value = []
  for (const key in data) {
    if (key !== '總　計') {
      xAxisData.value.push(key)
      electionNumberArray.value.push(data[key])
    } else {
      const countyElectionData = []
      candidateList.value.forEach((item) => {
        const votesRate = rateHandle(data[key], data[key][item.id])
        countyElectionData.push({
          president: item.name,
          vicePresident: item.subName,
          rate: votesRate,
          number: data[key][item.id],
          electionGroupId: item.id
        })
      })
      countyElectionStore.setCountyVotesData(countyElectionData)
    }
  }

  const transformedData = useMap(electionNumberArray.value, (obj) => {
    return useMap(obj, (value) => removeComma(value))
  })
  const result = useZip(...transformedData).reverse()
  result.forEach((item, index) => {
    yAxisData.value.push({
      data: item,
      type: 'bar',
      name: candidateList.value[index].society,
      color: color[index]
    })
  })
}

const getData = async () => {
  const title = '各鄉鎮市區政黨得票數'
  // 取得縣市資料
  const electionData = districtStore.districtListGetter
  if (typeof electionData !== 'object') {
    router.push({ path: `/` })
    return
  }

  await chartOptionData(electionData)
  // echart 生成圖表
  chart.value = useSetBaseChart(elChart.value, title, xAxisData.value, yAxisData.value, true)
}

watch(districtGetter, () => {
  getData()
})
// 監聽視窗寬度
const handleResize = (width) => {
  w.value = width || window.innerWidth
}
watch(
  w,
  () => {
    getData()
  },
  {
    deep: true
  }
)
defineExpose({ handleResize })
onMounted(() => {
  if (Object.keys(districtGetter.value).length > 0) {
    getData()
  }
})
</script>

<style lang="scss" scoped></style>
