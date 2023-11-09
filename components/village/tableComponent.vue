<template>
  <table class="w-full text-sm text-left text-main-700">
    <thead class="text-xs text-white uppercase bg-main-700">
      <tr class="border-b pr-6">
        <th class="px-6 py-3">村里</th>
        <th v-for="item of candidateList" :key="item" class="px-6 py-3">
          {{ item.name }} / {{ item.subName }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item of currentTownshipList"
        :key="item.name"
        class="bg-main border-b mb-3 border-main"
      >
        <td class="px-6 py-2 text-xl">
          {{ item.name }}
        </td>
        <td class="px-6 py-2">
          <span class="text-2xl">
            {{ sliceRateDecimal(item.dpp)[0] }}
          </span>
          .{{ sliceRateDecimal(item.dpp)[1] }} %
        </td>
        <td class="px-6 py-2">
          <span class="text-2xl">
            {{ sliceRateDecimal(item.jmt)[0] }}
          </span>
          .{{ sliceRateDecimal(item.jmt)[1] }} %
        </td>

        <td class="px-6 py-2">
          <span class="text-2xl">
            {{ sliceRateDecimal(item.other)[0] }}
          </span>
          .{{ sliceRateDecimal(item.other)[1] }} %
        </td>
      </tr>
    </tbody>
  </table>
  <div class="mt-3 clear-both text-main-300">
    <button v-show="page !== 1" type="button" @click="prevPage()">上一頁</button>
    <button v-show="page !== totalPages" type="button" class="float-right" @click="nextPage()">
      下一頁
    </button>
  </div>
</template>

<script setup>
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { usePageLoadingStore } from '@/stores/pageLoadingStore.mjs'
import { totalHandle, rateHandle, sliceRateDecimal } from '@/utils/tools.mjs'
import { getTownshipElection } from '@/api/election.mjs'

const route = useRoute()
const county = ref(route.params.countyid)
const districtStore = useDistrictStore()
const candidateStore = useCandidateStore()
const pageLoadingStore = usePageLoadingStore()
const candidateList = computed(() => {
  if (
    candidateStore.candidatesGetter &&
    candidateStore.candidatesGetter[0].id !== 'electionGroups3'
  ) {
    candidateStore.candidatesGetter.reverse()
  }
  return candidateStore.candidatesGetter
})
const townshipList = ref([])
// 取得行政區資料
const district = computed(() => districtStore.district)
const rows = ref(5)
const page = ref(1)
const totalPages = ref(0)
const currentTownshipList = computed(() => {
  let data = []
  data = townshipList.value.slice(
    (page.value - 1) * rows.value,
    (page.value - 1) * rows.value + rows.value
  )
  return data
})

const initPage = () => {
  rows.value = 5
  page.value = 1
  totalPages.value = 0
}
const prevPage = () => {
  page.value = page.value - 1
}
const nextPage = () => {
  page.value = page.value + 1
}
const getTownshipData = async () => {
  pageLoadingStore.changeLoadingStatus(true)
  const data = await getTownshipElection(county.value, district.value)
  townshipList.value = Object.entries(data)
    .reduce((newItem, item) => {
      if (item[0] !== '總　計' && item[0] !== district.value)
        newItem.push({
          name: item[0],
          dpp: rateHandle(item[1], item[1].electionGroups3),
          jmt: rateHandle(item[1], item[1].electionGroups2),
          other: rateHandle(item[1], item[1].electionGroups1),
          total: totalHandle(item[1])
        })
      return newItem
    }, [])
    .sort((a, b) => b.total - a.total)
  totalPages.value = Math.ceil(townshipList.value.length / rows.value)
  pageLoadingStore.changeLoadingStatus(false)
}
watch(district, () => {
  initPage()
  getTownshipData()
})
onMounted(() => {
  if (district.value) {
    getTownshipData()
  }
})
</script>

<style lang="scss" scoped></style>
