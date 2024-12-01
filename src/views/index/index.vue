<script setup>
import {ElButton} from "element-plus";
import {ref, onMounted} from "vue";
import UseChartEcharts from './composables/use-chart-echarts1.js'

const ChartEcharts1 = UseChartEcharts()

const screen = ref()
const bigScreen = () => {
  screen.value.requestFullscreen()
}
const chartSize = function () {
  ChartEcharts1.resizeChart()
}
onMounted(() => {
  ChartEcharts1.initChart()
  window.addEventListener('resize', chartSize)
})

</script>

<template>
  <header>
    <ElButton @click="bigScreen">全屏</ElButton>
  </header>
  <div ref="screen" style="background-color: var(--bg-color-a)">
    <div :ref="ChartEcharts1.chartRef" style="width: 500px; height: 500px"></div>
  </div>
</template>

<style scoped lang="scss">

</style>