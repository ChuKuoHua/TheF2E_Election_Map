import { use, init } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
// import { setFormatter } from '@/utils/chartFormatter.mjs'

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LabelLayout,
  DataZoomComponent,
  LineChart
])

const setSeries = (data) => {
  const series = []
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      series.push({
        name: data[i].name,
        type: data[i].type,
        data: data[i].data,
        itemStyle: {
          color: data[i].color
        }
      })
    }
  }
  return series
}
/**
 *
 * @param dom // DOM 元素
 * @param {string} title // 標題
 * @param {array} xAxisData // x 軸資料
 * @param {array} yAxisData // y 軸資料
 * @param {boolean} zoomShow // 是否顯示滾動條
 * @returns
 */
export function useSetLBaseChart(dom, title, xAxisData, yAxisData, zoomShow = false) {
  const seriesData = setSeries(yAxisData)
  const myChart = init(dom)
  const option = {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: 'white'
      },
      subtextStyle: {
        color: 'white'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
      // formatter(params) {
      // return setFormatter(dom.getAttribute('id'), params)
      // }
    },
    legend: {
      left: 80,
      bottom: 25,
      textStyle: {
        color: 'white'
      }
    },
    dataZoom: [
      {
        type: 'inside', // 內側滑動
        zoomLock: true, // 禁用滾動縮放
        start: 0, // 開始範圍
        end: xAxisData.length <= 20 && xAxisData.length > 10 ? 40 : xAxisData.length > 20 ? 20 : 100 // 結束範圍
      },
      {
        type: 'slider', // 滑動元件
        height: 25,
        show: zoomShow, // 是否顯示滑動區塊
        showDetail: true, // 是否顯示內容
        // handleSize: 0, // 兩邊縮放按鈕大小
        zoomLock: true, // 禁用滾動縮放
        left: '80', // 元件左側距離
        right: '90', // 元件右側距離
        brushSelect: false, // 是否開啟框選部分區域
        bottom: 60,
        textStyle: {
          color: 'white'
        },
        showDataShadow: false // 滑動區塊資料陰影隱藏
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0, // 顯示所有標籤
          textStyle: {
            color: 'white',
            fontSize: 12 // 調整標籤字體大小
          }
        },
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '',
        nameTextStyle: {
          color: 'white' // 修改字體顏色
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(238, 233, 233, .5)'
          }
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: 'white'
          }
        }
      }
    ],
    series: seriesData,
    grid: {
      top: '15%',
      left: '10%',
      right: '10%',
      bottom: '35%'
    }
  }

  option && myChart.setOption(option)
  return myChart
}
