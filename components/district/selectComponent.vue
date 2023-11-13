<template>
  <div class="select">
    <select
      v-model="districtOption"
      class="border border-main-700 text-main-700 text-sm focus:ring-white block w-full p-2.5 outline-none md:text-center"
      @change="setDistrictData()"
    >
      <option v-for="item in districtOptions" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { useCandidateAndCountyStore } from '@/stores/candidateAndCountyStore.mjs'
import { rateHandle } from '@/utils/tools.mjs'

const districtStore = useDistrictStore()
const candidateAndCountyStore = useCandidateAndCountyStore()
const districtOptions = computed(() => districtStore.districtOptionsGetter)
const districtGetter = computed(() => districtStore.districtGetter)
const districtOption = ref('')

// 取得候選人資料
const candidateList = computed(() => candidateAndCountyStore.candidatesGetter)
const setDistrictData = () => {
  const data = districtStore.districtListGetter[districtOption.value]
  const array = []
  candidateList.value.forEach((item) => {
    const votesRate = rateHandle(data, data[item.id])
    array.push({
      id: item.id,
      society: item.society,
      president: item.name,
      vicePresident: item.subName,
      rate: votesRate,
      number: data[item.id]
    })
  })
  districtStore.setDistrict(districtOption.value)
  districtStore.setVotesData(array)
}

watch([districtOptions, districtGetter], (newVal, oldVal) => {
  districtOption.value = oldVal[1]
  if (newVal[1] !== oldVal[1]) {
    districtOption.value = newVal[1]
  }
  if (districtOption.value) {
    setDistrictData()
  }
})

onMounted(() => {})
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
