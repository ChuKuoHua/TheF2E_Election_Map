<template>
  <table class="w-full text-sm text-left text-white">
    <thead class="text-lg text-white uppercase bg-main-700">
      <tr class="border-b border-white text-left tracking-wider">
        <th scope="col" class="px-3 md:px-6 py-3">候選人</th>
        <th scope="col" class="px-3 md:px-6 py-3">得票數</th>
        <th scope="col" class="px-3 md:px-6 py-3">得票率</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item of districtsData"
        :key="item.president"
        class="border-b mb-3 border-main-400 text-main-700 text-xl"
      >
        <td scope="row" class="pr-6 py-2 whitespace-nowrap">
          <p
            class="border-l-12 pl-4 py-1 tracking-wider"
            :class="{
              'border-pfp': item.president === '宋楚瑜',
              'border-kmt': item.president === '韓國瑜',
              'border-dpp': item.president === '蔡英文'
            }"
          >
            {{ item.president }}/{{ item.vicePresident }}
          </p>
        </td>
        <td class="px-3 md:px-6 py-2 md:text-2xl">{{ numberToChinese(item.number) }} 票</td>
        <td class="px-3 md:px-6 py-2">{{ item.rate }} %</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { numberToChinese } from '@/utils/tools.mjs'

const districtStore = useDistrictStore()
// 取得行政區資料
const districtsData = computed(() => districtStore.votesGetter)
onMounted(() => {})
</script>

<style lang="scss" scoped>
.border-l-12 {
  border-left-width: 12px;
}
</style>
