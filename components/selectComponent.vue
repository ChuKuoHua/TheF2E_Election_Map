<template>
  <select v-model="county" @change="setCounty()">
    <option v-for="item in countiesList" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script setup>
import { useCountyStore } from '@/stores/countyStore.mjs'
import { getCountyElection } from '@/api/election.mjs'

const countyStore = useCountyStore()
const countiesList = ref([])
const county = ref(countyStore.countyGetter || '臺南市')
const setCounty = async () => {
  countyStore.county = county.value
  await getCountyElection(county.value)
}

onMounted(async () => {
  const countiesData = await countyStore.getCountiesData()
  countiesList.value = countiesData
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
