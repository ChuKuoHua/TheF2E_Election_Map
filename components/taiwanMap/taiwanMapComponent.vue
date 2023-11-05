<template>
  <svg id="Taiwan"></svg>
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

onMounted(() => {
  // 地圖放大倍率，長寬高設定
  let mercatorScale
  let w = document.documentElement.clientWidth
  let h = document.documentElement.clientHeight

  if (w > 1400) w = w / 2.5
  const widthHeightProportion = parseFloat((w / h).toFixed(1))
  if (widthHeightProportion > 1) h = h * 2

  if (w >= 700) mercatorScale = 11000
  else if (w >= 600) mercatorScale = 9000
  else mercatorScale = 6000

  const svg = d3
    .select('#Taiwan')
    .attr('width', w)
    .attr('height', h)
    .attr('viewBox', `0 0 ${w} ${h}`)
  d3.json('taiwanTopoJSON.json').then((data) => {
    const counties = topojson.feature(data, data.objects.COUNTY_MOI_1090820)
    const projection = d3
      .geoMercator()
      .center([123, 24])
      .scale(mercatorScale)
      .translate([w, h / 2.5])

    const path = d3.geoPath().projection

    svg
      .selectAll('.geo-path')
      .data(counties.features)
      .join('path')
      .attr('d', path(projection))
      .attr('id', function (d) {
        // 設定id
        return d.properties.COUNTYNAME
      })
      .on('click', function (e) {
        const currectCounty = e.target.__data__.properties.COUNTYNAME
        svg.selectAll('path').classed('active', false)
        d3.select(this).classed('active', true)
        navigateTo(`${currectCounty}`)
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
</script>
