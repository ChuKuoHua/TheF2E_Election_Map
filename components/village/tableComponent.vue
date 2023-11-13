<template>
  <div class="hidden md:block">
    <table class="w-full text-sm text-left text-main-700">
      <thead class="text-lg text-white uppercase bg-main-700">
        <tr class="border-b pr-6">
          <th class="px-6 py-3">村里</th>
          <th v-for="item of candidateList" :key="item" class="px-6 py-3 text-center lg:text-left">
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
          <td class="px-6 py-2 text-lg">
            {{ item.name }}
          </td>
          <td class="px-6 py-2 text-center">
            <span class="text-xl">
              {{ sliceRateDecimal(item.dpp)[0] }}
            </span>
            .{{ sliceRateDecimal(item.dpp)[1] }} %
          </td>
          <td class="px-6 py-2 text-center">
            <span class="text-xl">
              {{ sliceRateDecimal(item.jmt)[0] }}
            </span>
            .{{ sliceRateDecimal(item.jmt)[1] }} %
          </td>

          <td class="px-6 py-2 text-center">
            <span class="text-xl">
              {{ sliceRateDecimal(item.other)[0] }}
            </span>
            .{{ sliceRateDecimal(item.other)[1] }} %
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="block md:hidden">
    <ul>
      <li
        v-for="item of currentTownshipList"
        :key="item.name"
        class="border border-main-700 mb-3 p-3"
      >
        <div class="flex justify-between">
          <p>村里：</p>
          <p class="text-xl">{{ item.name }}</p>
        </div>
        <div v-for="candidate of candidateList" :key="candidate">
          <div v-if="candidate.id === 'electionGroups3'" class="flex justify-between">
            <p>{{ candidate.name }} / {{ candidate.subName }}：</p>
            <p>
              <span class="text-lg">
                {{ sliceRateDecimal(item.dpp)[0] }}
              </span>
              .{{ sliceRateDecimal(item.dpp)[1] }} %
            </p>
          </div>
          <div v-else-if="candidate.id === 'electionGroups2'" class="flex justify-between">
            <p>{{ candidate.name }} / {{ candidate.subName }}：</p>
            <p>
              <span class="text-lg">
                {{ sliceRateDecimal(item.jmt)[0] }}
              </span>
              .{{ sliceRateDecimal(item.jmt)[1] }} %
            </p>
          </div>
          <div v-else class="flex justify-between">
            <p>{{ candidate.name }} / {{ candidate.subName }}：</p>
            <p>
              <span class="text-lg">
                {{ sliceRateDecimal(item.other)[0] }}
              </span>
              .{{ sliceRateDecimal(item.other)[1] }} %
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="mt-3 clear-both text-main-300">
    <button v-show="page !== 1" type="button" @click="prevPage()">上一頁</button>
    <button v-show="page !== totalPages" type="button" class="float-right" @click="nextPage()">
      下一頁
    </button>
  </div>
</template>

<script setup>
import { useCandidateAndCountyStore } from '@/stores/candidateAndCountyStore.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { totalHandle, rateHandle, sliceRateDecimal } from '@/utils/tools.mjs'

const districtStore = useDistrictStore()
const candidateAndCountyStore = useCandidateAndCountyStore()
const candidateList = computed(() => {
  if (
    candidateAndCountyStore.candidatesGetter &&
    candidateAndCountyStore.candidatesGetter[0].id !== 'electionGroups3'
  ) {
    candidateAndCountyStore.candidatesGetter.reverse()
  }
  return candidateAndCountyStore.candidatesGetter
})
const townshipGetter = computed(() => districtStore.townshipGetter)
const townshipList = ref([])
// 取得行政區資料
const district = computed(() => districtStore.district)
const rows = ref(5)
const page = ref(1)
const totalPages = ref(0)
const currentTownshipList = computed(() => {
  let data = []
  if (townshipList.value.length > 0) {
    data = townshipList.value?.slice(
      (page.value - 1) * rows.value,
      (page.value - 1) * rows.value + rows.value
    )
  }
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
const getTownshipData = () => {
  if (Object.keys(townshipGetter.value).length === 0) {
    return
  }
  townshipList.value = Object.entries(townshipGetter.value)
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
}

watch(townshipGetter, () => {
  initPage()
  getTownshipData()
})
onMounted(() => {
  if (townshipGetter.value) {
    getTownshipData()
  }
})
</script>

<style lang="scss" scoped></style>
