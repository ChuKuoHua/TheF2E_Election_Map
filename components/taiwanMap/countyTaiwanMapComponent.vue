<template>
  <div
    class="w-3/4 md:w-11/12 md:mr-0 md:ml-auto py-3 flex justify-between items-center relative z-10 mt-12 mb-6"
  >
    <div class="w-2/4 md:w-3/6 h-1 bg-main-700 relative">
      <div class="triangle_icon absolute top-0 left-0 hidden md:block"></div>
      <h1
        class="absolute -top-12 lg:-top-16 md:left-24 py-2 w-3/4 md:w-1/4 lg:w-1/5 text-center text-xl text-white tracking-widest"
        :class="[setCountyNameColor(countiesVotingWinner[countyName])]"
      >
        {{ countyName }}
      </h1>
      <taiwan-map-component
        class="hidden 2xl:block border-4 border-solid border-main-700 rounded-full transform bg-white absolute h-[300px] w-[300px] -translate-y-1/2 right-[15%]"
        :counties-voting-winner-list="countiesVotingWinner"
        @county-eng-name="(name) => (countyEngName = name)"
      />
      <div
        class="absolute -top-1.5 right-0 bottom-0 rounded-full bg-main-700 h-4 w-4 hidden md:block"
      ></div>
    </div>
    <div class="w-2/4 md:w-2/6">
      <h2 class="text-3xl lg:text-4xl text-right md:text-center tracking-widest">
        {{ countyEngName }}
      </h2>
    </div>
    <div class="md:w-1/6 hidden md:block h-1 bg-main-700"></div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCountyElectionStore } from '@/stores/countyElectionStore.mjs'
import TaiwanMapComponent from '@/components/taiwanMap/taiwanMapComponent.vue'

const props = defineProps({
  countyName: {
    type: String,
    required: true
  }
})

const countyEngName = ref('Taiwan')
const countyElectionStore = useCountyElectionStore()
const { countyVotesDataGetter } = storeToRefs(countyElectionStore)

const countiesVotingWinner = computed(() => {
  if (!countyVotesDataGetter.value.length) return {}
  const result = {}
  // 使用 lodash 的 maxBy 函數找出最大得票率對應的物件
  const maxRateCandidate = useMaxBy(countyVotesDataGetter.value, (item) => parseFloat(item.rate))
  result[`${props.countyName}`] = maxRateCandidate.electionGroupId
  return result
})

function setCountyNameColor(electionGroups) {
  const cssList = {
    electionGroups2: 'bg-kmt',
    electionGroups3: 'bg-dpp'
  }
  return cssList[electionGroups] || 'bg-main-700'
}
</script>
