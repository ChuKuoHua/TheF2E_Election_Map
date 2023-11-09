<template>
  <div class="flex justify-center mx-ˊ md:mx-0">
    <div :id="props.id" ref="elChart" class="w-full h-96"></div>
  </div>
</template>

<script setup>
import { getCountyElection } from '@/api/election.mjs'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import { useSetBaseChart } from '@/composables/baseChart.mjs'
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { removeComma } from '@/utils/tools.mjs'
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
const countyElectionStore = useCountyElectionStore()
const districtStore = useDistrictStore()
const pageLoadingStore = usePageLoadingStore()
const route = useRoute()
const xAxisData = ref([])
const elChart = ref(null)
const chart = ref(null)
const yAxisData = ref([])
const electionNumberArray = ref([])
const county = ref(route.params.countyid || '中央')
const districtGetter = computed(() => districtStore.districtGetter || '')
const color = ['#58AC6F', '#62A0D5', '#F2854A']
// 取得候選人資料
const candidateList = computed(() => candidateStore.candidatesGetter)

const router = useRouter()

// NOTE 初始事件
const initHandle = () => {
  pageLoadingStore.changeLoadingStatus(true)
  // 監聽 districtStore 的 state 是否已取得資料
  districtStore.$subscribe(() => {
    getData()
  })
  if (Object.keys(districtGetter.value).length > 0) {
    getData()
  }
}
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
          number: data[key][item.id]
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
  let title = ''
  if (county.value === '中央') {
    title = '各縣市政黨得票數'
  } else {
    title = '各鄉鎮市區政黨得票數'
  }
  // 取得縣市資料
  const electionData = await getCountyElection(county.value)
  if (typeof electionData !== 'object') {
    router.push({ path: `/` })
    return
  }
  await chartOptionData(electionData)
  // echart 生成圖表
  chart.value = useSetBaseChart(elChart.value, title, xAxisData.value, yAxisData.value, true)
  pageLoadingStore.changeLoadingStatus(false)
}

onMounted(() => {
  initHandle()
})
</script>

<style lang="scss" scoped></style>
