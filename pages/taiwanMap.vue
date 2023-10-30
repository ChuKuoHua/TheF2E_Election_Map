<template>
  <div class="taiwan-page flex flex-wrap items-center justify-center">
    <svg id="Taiwan"></svg>
    <h1 class="text-4xl font-bold text-white">{{ currectCounty }}</h1>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const currectCounty = ref(null)

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

  d3.json(`taiwanTopoJSON/taiwan.json`).then((data) => {
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
      .on('click', function (e) {
        currectCounty.value = e.target.__data__.properties.COUNTYNAME
        svg.selectAll('path').classed('active', false)
        d3.select(this).classed('active', true)
      })
  })
})
</script>

<style scoped lang="scss">
.taiwan-page :deep(svg) {
  path {
    fill: rgb(230, 199, 105);
    stroke: white;
  }

  path:hover,
  path.active {
    fill: rgb(255, 192, 0);
    transform: translate(-1px, -2px);
  }
}
</style>
