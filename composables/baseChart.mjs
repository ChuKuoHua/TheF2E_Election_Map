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
import { useDistrictStore } from '@/stores/district'
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LabelLayout,
  DataZoomComponent,
  LineChart
])
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
  const districtStore = useDistrictStore()
  const router = useRouter()
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
              color: '#e9e7e452'
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
      left: 'center',
      textStyle: {
        fontWeight: 'normal',
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
      },
      formatter(params) {
        return setFormatter(params)
      }
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
        end:
          xAxisData.length <= 30 && xAxisData.length > 10
            ? 50
            : xAxisData.length >= 30 && xAxisData.length <= 50
            ? 30
            : xAxisData.length > 50
            ? 10
            : 100 // 結束範圍
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
        showDataShadow: false, // 滑動區塊資料陰影隱藏
        textStyle: {
          color: 'white'
        }
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0, // 顯示所有標籤
          color: 'white',
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
          color: 'white'
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

  myChart.on('click', (event) => {
    if (event.name.includes('市') || event.name.includes('縣')) {
      districtStore.setDistrict('')
      router.push({ path: `/${event.name}` })
    } else {
      districtStore.setDistrict(event.name)
    }
  })
  return myChart
}
