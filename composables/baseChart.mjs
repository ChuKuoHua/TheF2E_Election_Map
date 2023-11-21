import { use, init, getInstanceByDom } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import 'echarts/lib/component/markArea'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import { setFormatter } from '@/utils/chartFormatter.mjs'
import { useDistrictStore } from '@/stores/districtStore.mjs'
import { removeComma } from '~/utils/tools.mjs'
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LabelLayout,
  DataZoomComponent,
  LineChart
])

const votesHandle = (val) => {
  const num = removeComma(val)
  return num / 10000
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
export function useSetBaseChart(dom, title, xAxisData, yAxisData, zoomShow = false) {
  let myChart = getInstanceByDom(dom) // 檢查 DOM 是否存在
  // 不存在就初始畫圖表
  if (!myChart) {
    myChart = init(dom)
  }
  myChart.resize()
  const districtStore = useDistrictStore()
  const textColor = 'white'
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
          },
          markArea: {
            // 指定區域範圍已不同顏色顯示
            itemStyle: {
              color: '#FFFFFF08'
            },
            data: [
              [
                {
                  xAxis: districtStore.districtGetter || '' // 已始的 x 軸名稱
                },
                {
                  xAxis: districtStore.districtGetter || '' // 結束的 x 軸名稱
                }
              ]
            ]
          }
        })
      }
    }
    return series
  }

  const seriesData = setSeries(yAxisData)
  const option = {
    title: {
      text: title,
      top: '10%',
      left: 'center',
      textStyle: {
        color: textColor,
        fontWeight: '300',
        fontSize: '16'
      },
      subtextStyle: {
        color: textColor
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      formatter(params) {
        return setFormatter(params)
      }
    },
    legend: {
      show: false,
      left: 80,
      bottom: 25,
      textStyle: {
        color: textColor
      }
    },
    dataZoom: [
      {
        type: 'inside', // 內側滑動
        zoomLock: true, // 禁用滾動縮放
        start: 0, // 開始範圍
        end:
          xAxisData.length <= 30 && xAxisData.length > 10
            ? 30
            : xAxisData.length >= 30 && xAxisData.length <= 50
            ? 25
            : xAxisData.length > 50
            ? 10
            : 100 // 結束範圍
      },
      {
        type: 'slider', // 滑動元件
        height: 25,
        show: zoomShow, // 是否顯示滑動區塊
        showDetail: true, // 是否顯示內容
        zoomLock: true, // 禁用滾動縮放
        left: '70', // 元件左側距離
        right: '80', // 元件右側距離
        brushSelect: false, // 是否開啟框選部分區域
        bottom: 60,
        showDataShadow: false, // 滑動區塊資料陰影隱藏
        textStyle: {
          color: textColor
        },
        backgroundColor: 'transparent',
        fillerColor: '#62a0d52e'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0, // 顯示所有標籤
          color: textColor,
          fontWeight: 'bolder',
          fontSize: 12 // 調整標籤字體大小
        },
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '萬票',
        nameTextStyle: {
          color: textColor, // 修改字體顏色
          padding: [0, 40, 0, 0]
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, .6)'
          }
        },
        axisLabel: {
          color: textColor,
          formatter: (val) => {
            return votesHandle(val)
          }
        }
      }
    ],
    series: seriesData,
    grid: {
      top: '20%',
      left: '10%',
      right: '12%',
      bottom: '35%'
    }
  }

  option && myChart.setOption(option)

  myChart.on('click', (event) => {
    districtStore.setDistrict(event.name)
  })
  return myChart
}
