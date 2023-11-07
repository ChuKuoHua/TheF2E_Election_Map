import { DistrictListComponent } from '#build/components'; import { pushScopeId } from
'nuxt/dist/app/compat/capi'; import { storeToRefs } from 'pinia';
<template>
  <table class="w-full text-sm text-left text-white">
    <thead class="text-xs text-white uppercase bg-main">
      <tr class="border-b border-white">
        <th class="py-3">村里</th>
        <th v-for="item of candidateList" :key="item" class="py-3">
          {{ item[0] }}
        </th>
        <th class="py-3">總投票數</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item of townshipList"
        :key="item.president"
        class="bg-main text-white border-b mb-3 border-main"
      >
        <td class="py-2 text-xl">
          {{ item.name }}
        </td>
        <td class="py-2">
          <span class="text-2xl">
            {{ sliceRateDecimal(item.other)[0] }}
          </span>
          .{{ sliceRateDecimal(item.other)[1] }} %
        </td>
        <td class="py-2">
          <span class="text-2xl">
            {{ sliceRateDecimal(item.jmt)[0] }}
          </span>
          .{{ sliceRateDecimal(item.jmt)[1] }} %
        </td>
        <td class="py-2">
          <span class="text-2xl">
            {{ sliceRateDecimal(item.dpp)[0] }}
          </span>
          .{{ sliceRateDecimal(item.dpp)[1] }} %
        </td>
        <td class="py-2 text-2xl">
          {{ item.total.toLocaleString() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useCandidateStore } from '@/stores/candidateStore.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { totalHandle, rateHandle, sliceRateDecimal } from '@/utils/tools.mjs'
import { getTownshipElection } from '@/api/election.mjs'

const route = useRoute()
const county = ref(route.params.countyid)
const districtStore = useDistrictStore()
const candidateStore = useCandidateStore()
const candidateList = computed(() => candidateStore.candidatesGetter)
const townshipList = ref([])
// 取得行政區資料
const district = computed(() => districtStore.district)

const getTownshipData = async () => {
  const data = await getTownshipElection(county.value, district.value)
  townshipList.value = Object.entries(data)
    .reduce((newItem, item) => {
      if (item[0] !== '總　計' && item[0] !== district.value)
        newItem.push({
          name: item[0],
          other: rateHandle(item[1], item[1].electionGroups1),
          jmt: rateHandle(item[1], item[1].electionGroups2),
          dpp: rateHandle(item[1], item[1].electionGroups3),
          total: totalHandle(item[1])
        })
      return newItem
    }, [])
    .sort((a, b) => b.total - a.total)
}
watch(district, () => {
  getTownshipData()
})
onMounted(() => {
  if (district.value) {
    getTownshipData()
  }
})
</script>

<style lang="scss" scoped></style>
