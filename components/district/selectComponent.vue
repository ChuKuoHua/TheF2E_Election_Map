<template>
  <div class="select">
    <select
      v-model="areaOption"
      class="border border-main-700 text-main-700 text-sm focus:ring-white block w-full p-2.5 outline-none md:text-center"
      @change="selectArea()"
    >
      <option v-for="item in areaList" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { getCountyElection } from '@/api/election.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { rateHandle } from '@/utils/tools.mjs'
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

  candidateList.value.forEach((item) => {
    const votesRate = rateHandle(data, data[item.id])
    array.push({
      id: item.id,
      president: item.name,
      vicePresident: item.subName,
      rate: votesRate,
      number: data[item.id]
    })
  })
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
.select {
  position: relative;
  select {
    /*移除箭頭樣式*/
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-weight: bold;
  }
  &::before {
    content: '▼';
    padding: 8px;
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    z-index: 1;
    text-align: center;
    width: 10%;
    height: 100%;
    color: #333;
    pointer-events: none;
    box-sizing: border-box;
  }
}
</style>
