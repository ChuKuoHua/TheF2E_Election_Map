<template>
  <svg id="Taiwan" class="transform translate-x-0 bg-none bg-cover"></svg>
</template>

<script setup>
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const props = defineProps({
  countiesVotingWinnerList: {
    type: Object,
    required: true
  },
  hoverCountyName: {
    type: String,
    default: '',
    required: false
  }
})

const emit = defineEmits(['countyEngName', 'update:hoverCountyName'])

const currentCounty = ref('')
const outlyingIslands = ref([
  {
    COUNTYNAME: '連江縣',
    path: {}
  },
  {
    COUNTYNAME: '金門縣',
    path: {}
  },
  {
    COUNTYNAME: '澎湖縣',
    path: {}
  }
])

onMounted(() => {
  const svg = d3.select('#Taiwan').attr('viewBox', '0 0 550 825')
  d3.json('taiwanTopoJSON.json').then((data) => {
    const counties = topojson.feature(data, data.objects.COUNTY_MOI_1090820)
    const projection = d3.geoMercator().center([123, 24]).scale(9000).translate([625, 400])

    const path = d3.geoPath().projection

    svg
      .selectAll('.geo-path')
      .data(counties.features)
      .join('path')
      .attr('d', path(projection))
      .attr('id', (d) => {
        // 設定id
        return d.properties.COUNTYNAME.split(' ')[0]
      })
      .attr('data-engname', (d) => {
        // 大寫會錯誤
        return d.properties.COUNTYENG.replace(/ City| County/g, '')
      })
      .on('click', (e) => {
        currentCounty.value = e.target.__data__.properties.COUNTYNAME
      })
      .on('mouseover', (e) => {
        emit('update:hoverCountyName', e.target.__data__.properties.COUNTYNAME)
        d3.select(e.target).classed('active', true)
      })
      .on('mouseleave', (e) => {
        emit('update:hoverCountyName', '')
        d3.select(e.target).classed('active', false)
      })

    outlyingIslands.value.map((island) => {
      island.path = svg.select(`#${island.COUNTYNAME}`)
      if (!island.path.empty()) {
        const boundingBox = island.path.node().getBBox()
        const { x, y, width, height } = boundingBox
        const rect = svg
          .insert('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', width)
          .attr('height', height)
          .style('fill', 'none')
          .style('stroke', island.COUNTYNAME === '連江縣' ? '#e2e2e2' : 'transparent')
          .style('stroke-width', 1)
          .style('pointer-events', 'bounding-box')

        rect
          .on('mouseenter', () => {
            emit('update:hoverCountyName', island.COUNTYNAME)
            island.path.classed('active', true)
          })
          .on('mouseleave', () => {
            emit('update:hoverCountyName', '')
            island.path.classed('active', false)
          })
          .on('click', () => {
            currentCounty.value = island.COUNTYNAME
          })
      }
      return island
    })
  })
})

// 設定縣市色彩
watch(
  () => props.countiesVotingWinnerList,
  () => {
    const paths = document.getElementById('Taiwan').querySelectorAll('path')
    const colorList = {
      electionGroups1: '#F2854A',
      electionGroups2: '#4889C1',
      electionGroups3: '#58AC6F'
    }
    const isCountyPage = Object.keys(props.countiesVotingWinnerList).length === 1
    paths.forEach(function (path) {
      const currentId = path.id
      path.style.fill = colorList[props.countiesVotingWinnerList[currentId]] || '#B8B8B8'
      if (isCountyPage && props.countiesVotingWinnerList[currentId])
        emit('countyEngName', path.dataset.engname.toUpperCase() || 'TAIWAN')
    })
  }
)

// 切換縣市
watch(currentCounty, (newVal) => {
  navigateTo(newVal)
})
</script>
