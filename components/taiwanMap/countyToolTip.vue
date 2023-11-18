<template>
  <div
    class="absolute p-2 w-fit text-main-700 rounded bg-white pointer-events-none"
    :style="{ top: `${y + 15}px`, left: `${x + 15}px` }"
  >
    <h5 class="tracking-wider border-b border-main-700 mb-2 pb-1">
      {{ countyName }}
    </h5>
    <div
      v-for="item in toolTipContent"
      :key="item.societyEng"
      class="border-solid border-l-4 px-1 my-2 flex gap-1 justify-between text-sm"
      :class="[`border-${item.societyEng}`]"
    >
      <div>{{ item.society }}:</div>
      <div>{{ item.votes }}票</div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { removeComma } from '@/utils/tools.mjs'
import { useMouse } from '@/utils/mouse.mjs'
import { useCandidateAndCountyStore } from '@/stores/candidateAndCountyStore.mjs'

const props = defineProps({
  countyName: {
    type: String,
    required: true
  },
  countyVotes: {
    type: Object,
    required: true
  }
})

const { x, y } = useMouse()

const candidateAndCountyStore = useCandidateAndCountyStore()
const { candidates } = storeToRefs(candidateAndCountyStore)

const toolTipContent = computed(() => {
  if (!candidates.value.length || isEmpty(props.countyVotes)) return []
  const result = candidates.value.map((group) => {
    return {
      society: group.society,
      societyEng: group.societyEng,
      votes: props.countyVotes[group.id]
    }
  })
  return useSortBy(result, (item) => removeComma(item.votes) * -1)
})
</script>
