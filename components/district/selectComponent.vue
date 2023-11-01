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
import { rateHandle } from '@/utils/tool.mjs'
const districtStore = useDistrictStore()
const candidateStore = useCandidateStore()
const route = useRoute()
const areaList = ref([])
const county = ref(route.params.countyid)
const areaOption = ref('')
const areaData = ref('')
// 取得候選人資料
const candidateList = computed(() => candidateStore.candidatesGetter)

// NOTE 整理行政區資料
const selectArea = () => {
  const data = areaData.value[areaOption.value]
  const array = []

  for (const key in candidateList.value) {
    const votesRate = rateHandle(data, data[key])
    array.push({
      president: candidateList.value[key][0],
      vicePresident: candidateList.value[key][1],
      rate: votesRate,
      number: data[key]
    })
  }
  districtStore.setDistrict(areaOption.value)
  districtStore.setVotesData(array)
}

districtStore.$subscribe(() => {
  areaOption.value = districtStore.district
})
onMounted(async () => {
  areaData.value = await getCountyElection(county.value)
  for (const key in areaData.value) {
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
