<template>
  <div class="mx-auto w-full md:w-4/5">
    <h2 class="text-white text-center mb-3">{{ county }}各行政區得票概況</h2>
    <div class="p-5 mb-3 border border-white">
      <chartComponent :id="'districtChart'" :type="'district'" />
    </div>
    <div class="p-5 mb-3 border border-white flex items-center">
      <div class="mr-10 w-1/4">
        <selectComponent />
      </div>
      <listComponent />
    </div>
    <div class="p-5 mb-3 border border-white flex items-center">
      <tableComponent />
    </div>
  </div>
</template>

<script setup>
import selectComponent from '@/components/district/selectComponent.vue'
import listComponent from '@/components/district/listComponent.vue'
import tableComponent from '@/components/village/tableComponent.vue'
import chartComponent from '@/components/echart/baseChartComponent.vue'
const route = useRoute()
const county = ref(route.params.countyid)
onMounted(async () => {})
</script>

<style scoped></style>
