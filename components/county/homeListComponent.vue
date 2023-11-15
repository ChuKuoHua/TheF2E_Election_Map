<template>
  <div v-if="nationwideVotes.length" class="flex justify-center h-fit pt-16">
    <div class="hidden md:flex flex-col-reverse gap-4">
      <div
        v-for="(item, index) in nationwideVotes"
        :key="`percent_${item.id}`"
        class="w-[155px] flex-1 flex items-center flex-col-reverse"
      >
        <div
          class="h-16 border-solid border-2 w-full bg-white flex items-baseline justify-center"
          :class="[`border-${item.societyEng}`, `text-${item.societyEng}`]"
        >
          <span class="text-h1">
            {{ item.percent.toString().split('.')[0] }}
          </span>
          <span class="text-2xl"> .{{ item.percent.toString().split('.')[1] }}% </span>
        </div>
        <div v-if="index === 2" class="text-2xl tracking-widest text-main-900 pb-2">得票率</div>
      </div>
    </div>
    <div
      class="hidden md:flex gap-2 flex-wrap-reverse flex-row-reverse justify-center w-32 mr-2 ml-1"
    >
      <div
        v-for="index in 100"
        :key="`circle_${index}`"
        class="w-4 h-4 rounded-full"
        :class="setColor(index)"
      ></div>
    </div>
    <div class="w-full md:w-[400px] flex flex-col-reverse gap-4 relative">
      <div
        v-for="item in nationwideVotes"
        :key="`votes_${item.id}`"
        class="flex-1 flex flex-col-reverse items-center justify-between"
      >
        <div
          class="text-h2 w-full h-16 flex items-center justify-center text-white tracking-widest"
          :class="[`bg-${item.societyEng}`]"
        >
          {{ item.votesFormat }}
        </div>
        <div
          class="w-11/12 border-l-2 flex-1 flex flex-col justify-center px-5 pb-0.5"
          :class="[`border-${item.societyEng}`, `text-${item.societyEng}`]"
        >
          <div class="text-[20px] tracking-widest">{{ item.society }}</div>
          <div class="text-h1 tracking-widest">{{ item.name }}/{{ item.subName }}</div>
        </div>
      </div>
      <img src="/images/crown.svg" alt="crown" class="max-w-fit absolute -top-11 left-8" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  nationwideVotes: {
    type: Array,
    required: true
  }
})
function setColor(index) {
  if (!props.nationwideVotes.length) return
  if (index <= Math.round(props.nationwideVotes[0].percent)) {
    return `bg-${props.nationwideVotes[0].societyEng}`
  } else if (
    index <= Math.round(props.nationwideVotes[1].percent) &&
    index > Math.round(props.nationwideVotes[0].percent)
  ) {
    return `bg-${props.nationwideVotes[1].societyEng}`
  } else return `bg-${props.nationwideVotes[2].societyEng}`
}
</script>
