<template>
  <div class="w-3/4 mx-auto">
    <chartComponent :id="'baseChart'" :type="'county'"></chartComponent>
  </div>
</template>

<script setup>
import chartComponent from '@/components/echart/baseChartComponent.vue'
</script>

<style scoped></style>
