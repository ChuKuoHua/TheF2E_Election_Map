<template>
  <svg id="Taiwan" class="border-2 border-solid border-main-800 rounded-[25%]"></svg>
</template>

<script setup>
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const props = defineProps({
  countiesVotingWinnerList: {
    type: Object,
    required: true
  }
})

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
  const svg = d3.select('#Taiwan').attr('width', 500).attr('height', 750)
  d3.json('taiwanTopoJSON.json').then((data) => {
    const counties = topojson.feature(data, data.objects.COUNTY_MOI_1090820)
    const projection = d3.geoMercator().center([123, 24]).scale(9000).translate([600, 350])

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
      .on('click', (e) => {
        currentCounty.value = e.target.__data__.properties.COUNTYNAME
      })
      .on('mouseover', (e) => {
        d3.select(e.target).classed('active', true)
      })
      .on('mouseleave', (e) => {
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
            island.path.classed('active', true)
          })
          .on('mouseleave', () => {
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
      electionGroups2: '#62A0D5',
      electionGroups3: '#58AC6F'
    }
    paths.forEach(function (path) {
      const currentId = path.id
      path.style.fill = colorList[props.countiesVotingWinnerList[currentId]]
    })
  }
)

// 切換縣市
watch(currentCounty, (newVal) => {
  navigateTo(newVal)
})
</script>
