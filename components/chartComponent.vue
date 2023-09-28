<template>
  <div>
    <div class="chart-box">
      <client-only>
        <v-chart class="chart" :option="option" />
      </client-only>
    </div>
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LabelLayout } from 'echarts/features'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent, LabelLayout])
const { data } = await useAsyncData('/', () => queryContent('/test').find())
const result = data.value[0].body
const xAxisItem = result.map((item) => item.date)
const yAxisItem = result.map((item) => item.num)
const option = ref({
  title: {
    text: '範例',
    left: 'left',
    textStyle: {
      color: '#DC143C'
    },
    subtextStyle: {
      color: '#008000'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    data: ['投票數']
  },
  xAxis: [
    {
      type: 'category',
      data: xAxisItem,
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '投票數'
    }
  ],
  series: [
    {
      name: '投票數',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return `${value} 票`
        }
      },
      data: yAxisItem
    }
  ],
  grid: {
    top: '20%',
    left: '15%',
    right: '15%'
  }
})
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
