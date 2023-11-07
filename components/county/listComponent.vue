<template>
  <div>
    <p class="mb-1 mr-6 text-right text-white">得票率 (%)</p>
    <ul v-for="item of countyElectionData" :key="item.president" class="list-none text-white">
      <li>
        <div
          class="px-8 py-3 text-2xl flex justify-between"
          :class="{
            'bg-dpp': item.president === '蔡英文',
            'bg-kmt': item.president === '韓國瑜',
            'bg-pfp': item.president === '宋楚瑜'
          }"
        >
          <p>{{ item.president }} / {{ item.vicePresident }}</p>
          <p class="text-2xl">
            {{ sliceRateDecimal(item.rate)[0] }}
            <span class="text-xl"> .{{ sliceRateDecimal(item.rate)[1] }} </span>
          </p>
        </div>
        <div class="my-3 ml-8">
          <p class="text-3xl font-bold">
            {{ item.voteNumber1 }}萬
            <span class="text-xl tracking-wider font-normal"> {{ item.voteNumber2 }}票 </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import { sliceRateDecimal, numberToChinese } from '@/utils/tools.mjs'

const countyElectionStore = useCountyElectionStore()
// 取得行政區資料
const countyElectionData = computed(() =>
  countyElectionStore.countyVotesDataGetter.map((item) => {
    const voteNumber = numberToChinese(item.number)
    item.voteNumber1 = voteNumber.split('萬')[0]
    item.voteNumber2 = voteNumber.split('萬')[1]
    return item
  })
)

onMounted(() => {})
</script>

<style lang="scss" scoped>
.border-l-12 {
  border-left-width: 12px;
}
</style>
