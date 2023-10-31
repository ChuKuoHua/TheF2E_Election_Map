<template>
  <table class="w-full text-sm text-left text-white">
    <thead class="text-xs text-white uppercase bg-main">
      <tr class="border-b border-white">
        <th scope="col" class="px-6 py-3">候選人</th>
        <th scope="col" class="px-6 py-3">得票率</th>
        <th scope="col" class="px-6 py-3">得票數</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item of districtsData"
        :key="item.president"
        class="bg-main text-white border-b mb-3 border-main"
      >
        <th scope="row" class="pr-6 py-2 font-medium whitespace-nowrap">
          <p
            class="border-l-8 pl-4 py-3"
            :class="{
              'border-orange-500': item.president === '宋楚瑜',
              'border-blue-500': item.president === '韓國瑜',
              'border-green-500': item.president === '蔡英文'
            }"
          >
            {{ item.president }} /
            {{ item.vicePresident }}
          </p>
        </th>
        <td class="px-6 py-2">{{ item.rate }} %</td>
        <td class="px-6 py-2">{{ item.number }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useDistrictStore } from '@/stores/district.mjs'

const districtStore = useDistrictStore()
// 取得行政區資料
const districtsData = computed(() => districtStore.votesGetter)

onMounted(() => {})
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
