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
        data: data[i].data
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
      left: 'left',
      textStyle: {
        color: '#DC143C'
      },
      subtextStyle: {
        color: '#008000'
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
      left: 'right'
    },
    dataZoom: [
      {
        type: 'inside', // 內側滑動
        zoomLock: true, // 禁用滾動縮放
        start: 0, // 開始範圍
        end: 12 // 結束範圍
      },
      {
        type: 'slider', // 滑動元件
        height: 20,
        show: true, // 是否顯示滑動區塊
        showDetail: true, // 是否顯示內容
        // handleSize: 0, // 兩邊縮放按鈕大小
        zoomLock: true, // 禁用滾動縮放
        left: '80', // 元件左側距離
        right: '90', // 元件右側距離
        brushSelect: false // 是否開啟框選部分區域
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0, // 顯示所有標籤
          textStyle: {
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
        name: '投票數'
      }
    ],
    series: seriesData,
    grid: {
      top: '20%',
      left: '15%',
      right: '15%'
    }
  }

  option && myChart.setOption(option)
  return myChart
}