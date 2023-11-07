<template>
  <div>
    <div class="bg-main-800">
      <div class="pt-20">
        <div class="mx-auto w-full md:w-5/6 flex">
          <div class="mb-3 w-3/5">
            <chartComponent :id="'districtChart'" :type="'district'" />
          </div>
          <div class="w-2/5">
            <countyListComponent />
          </div>
        </div>
      </div>
    </div>
    <div class="flex mx-auto mt-10 md:w-5/6">
      <div class="w-full md:w-2/5">
        <pieChartComponent :id="'districtPieChart'" />
      </div>
      <div class="w-full md:w-3/5">
        <div class="py-3 mb-3 border border-white flex items-center justify-between">
          <p class="mr-3 font-bold">各鄉鎮市區得票概況</p>
          <div class="w-1/6">
            <selectComponent />
          </div>
        </div>
        <areaTableComponent />
        <!-- <div class="p-5 mb-3 border border-white flex items-center">
          <tableComponent />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import countyListComponent from '@/components/county/listComponent.vue'
import selectComponent from '@/components/district/selectComponent.vue'
import areaTableComponent from '@/components/district/tableComponent.vue'
// import tableComponent from '@/components/village/tableComponent.vue'
import chartComponent from '@/components/echart/baseChartComponent.vue'
import pieChartComponent from '@/components/echart/pieChartComponent.vue'
onMounted(async () => {})
</script>

<style lang="scss" scoped>
.icon_box {
  position: absolute;
  top: 18%;
  right: 7%;
  width: 83%;
  height: 2px;
}
</style>
