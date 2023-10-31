<template>
  <select
    v-model="areaOption"
    class="border border-gray-300 text-white bg-main text-sm focus:ring-white focus:border-white block w-full p-2.5 outline-none"
    @change="selectArea()"
  >
    <option v-for="item in areaList" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script setup>
import { getCountyElection } from '@/api/election.mjs'
import { useDistrictStore } from '@/stores/district.mjs'
import { useCandidateStore } from '@/stores/candidateStore.mjs'

const districtStore = useDistrictStore()
const candidateStore = useCandidateStore()
const route = useRoute()
const areaList = ref([])
const county = ref(route.params.countyid)
const areaOption = ref('')
const administrativeAreaData = ref('')
// 取得候選人資料
const candidateList = computed(() => candidateStore.candidatesGetter)

const selectArea = () => {
  districtStore.setDistricts(areaOption.value)

  const data = administrativeAreaData.value[areaOption.value]
  let n = 0
  useMap(data, (obj) => {
    return (n += parseInt(obj.split(',').join('')))
  })
  const stringToNumber = (data) => {
    return parseInt(data.split(',').join(''))
  }
  const array = []
  for (const key in candidateList.value) {
    const num = stringToNumber(data[key])
    const votesRate = useRound((num / n) * 100, 2)
    array.push({
      president: candidateList.value[key][0],
      vicePresident: candidateList.value[key][1],
      rate: votesRate,
      number: data[key]
    })
  }
  districtStore.setVotesData(array)
}

onMounted(async () => {
  administrativeAreaData.value = await getCountyElection(county.value)
  for (const key in administrativeAreaData.value) {
    if (key !== '總　計') {
      areaList.value.push(key)
    }
  }
  areaOption.value = areaList.value[0]
  candidateStore.$subscribe(() => {
    selectArea()
  })
  if (Object.keys(candidateList.value).length > 0) {
    selectArea()
  }
})
</script>

<style lang="scss" scoped>
.chart-box {
  display: flex;
  justify-content: center;
}
.chart {
  width: 450px;
  height: 350px;
}
</style>
