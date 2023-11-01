<template>
  <div>
    <ul class="flex py-3 mb-3">
      <li>
        <NuxtLink class="bg-red-300 p-3 text-white" to="/">首頁</NuxtLink>
      </li>
    </ul>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useCandidateStore } from '@/stores/candidateStore.mjs'

const candidateStore = useCandidateStore()

onMounted(() => {
  candidateStore.setCandidates()
})
</script>
