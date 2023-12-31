import { use, init, getInstanceByDom } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import 'echarts/lib/component/markArea'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { setFormatter } from '@/utils/chartFormatter.mjs'

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, LabelLayout, PieChart])

/**
 *
 * @param dom // DOM 元素
 * @param {string} title // 標題
 * @param {array} axisData // y 軸資料
 * @returns
 */
export function useSetPieChart(dom, title, axisData) {
  let myChart = getInstanceByDom(dom) // 檢查 DOM 是否存在
  // 不存在就初始畫圖表
  if (!myChart) {
    myChart = init(dom)
  }
  myChart.resize()
  const textColor = '#344340'
  const setSeries = (data) => {
    const series = []
    series.push({
      type: 'pie',
      data
    })
    return series
  }

  const seriesData = setSeries(axisData)
  const option = {
    title: {
      show: false,
      text: title,
      left: 'center',
      textStyle: {
        color: textColor,
        fontWeight: '700',
        fontSize: '16'
      }
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      formatter(params) {
        return setFormatter(params, 'pie')
      }
    },
    grid: {
      top: '15%'
    },
    series: seriesData
  }

  option && myChart.setOption(option)
  return myChart
}
