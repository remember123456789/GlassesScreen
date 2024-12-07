<script setup>
import {ElButton, ElRow, ElCol} from "element-plus";
// import useScreenAdapt from '@/Hooks/screenapadapt.js'
import {getEventList} from '@/api/home/home.js'
import {debounce} from '@/utils/utils.js'
import {ref, onMounted, onUnmounted, nextTick} from "vue";
import UseChartEcharts from './composables/use-chart-echarts1.js'
import UsePieEcharts from './composables/use-chart-pie.js'
import UseRoundedcorner from './composables/use-chart-roundedcorner.js'
import UseChartBar from "@/views/index/composables/use-chart-bar.js";
import UseChartMap from "@/views/index/composables/use-chart-map.js";
import ModuleItem from '@/components/mouduleItem/index.vue'


const chartEcharts1 = UseChartEcharts()
const chartPie = UsePieEcharts()
const chartRounded = UseRoundedcorner()
const chartBar = UseChartBar()
const chartMap = UseChartMap()
const screen = ref()
let showScreen = ref(false)
const bigScreen = () => {
  showScreen.value = true
  screen.value.requestFullscreen()
  // ration.value = useScreenAdapt.AdaptScreen()
  chartSize()
  initChart()
}
const fullScreenChange = () => {

}
const backFullscreen = () => {
  showScreen.value = false
  screen.value.requestFullscreen()
}

const chartSize = function () {
  chartEcharts1.resizeChart()
  chartPie.resizeChart()
  chartRounded.resizeChart()
  // chartBar.resizeChart()
  // chartMap.resizeChart()
}

const initChart = async () => {
  chartPie.initChart()
  chartRounded.initChart()
  try {
    let {mes} = await getEventList()
    let mapData = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    let data = await mapData.json()
    // chartEcharts1.initChart()
    nextTick(() => {
      chartBar.initChart(mes)
      chartMap.initChart(data)
    })

  } catch (e) {
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', debounce(chartSize, 1000))

  // window.addEventListener('resize', chartSize)
})

onUnmounted(() => {
  // window.removeEventListener('resize', AdaptScreen)
})

</script>

<template>
  <header>
    <ElButton @click="bigScreen">全屏</ElButton>
  </header>
  <div ref="screen" class="screen-container" style="background-color: var(--bg-color-a)">
    <header class="offic-header">
      <div class="pd title-info">眼镜销量可视化大屏</div>
      <!--      <el-button v-if="showScreen" @click="backFullscreen">退出全屏</el-button>-->
    </header>
    <el-row class="chart-content-row" :span="24">
      <el-col :span="6" :xs="{span:1}" class="chart-content-col">
        <el-row class="chart-content-left">
          <el-col :span="12" class="chart-content-left-item">
            <ModuleItem title="2021中国眼镜市场产品分布" class="chart-item">
              <div :ref="chartPie.chartRef" style="width: 100%; height: 100%"></div>
            </ModuleItem>
          </el-col>
          <el-col :span="12" class="chart-content-left-item">
            <ModuleItem title="各眼镜品牌销量（评价数）" style="position: relative" class="chart-item">
              <div :ref="chartBar.chartRef" class="chart-item-ping"></div>
            </ModuleItem>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" :xs="{span:24}" class="chart-content-col">
        <ModuleItem title="中国眼镜产业发展布局" style="height: 80vh;position: relative">
          <div :ref="chartMap.chartRef" class="map-position"></div>
        </ModuleItem>
      </el-col>
      <el-col :span="6" :xs="{span:1}" class="chart-content-col">
        <el-row class="chart-content-right">
          <ModuleItem title="2021中国眼镜市场份额" class="chart-item" style="height: 80vh">
            <div :ref="chartRounded.chartRef" style="width: 100%; height: 100%"></div>
          </ModuleItem>
          <!--          <el-col :span="12" class="chart-content-right-item">-->
          <!--            <ModuleItem title="右下" class="chart-item">和</ModuleItem>-->
          <!--          </el-col>-->
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.chart-item-ping {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-35%);
}

//定义变量
.map-position {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-40%);
  //transform: scale(v-bind(ration)) translate(-40%);
}

.chart-item {
  width: 100%;
  height: 40vh;
}

.el-col-12 {
  max-width: 100% !important;
}

.screen-container {
  width: 100%;
  height: 90%;
  overflow: hidden;
  //height: 100%; /* 使容器高度充满视口 */
  //display: flex;
  //flex-direction: column;
}

.chart-content-row {
  width: 100%;
  flex: 1; /* 使行占据剩余空间 */
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
}

.chart-content-col {
  height: 100%;
}

.chart-content-left, .chart-content-right {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1; /* 使子列占据剩余空间 */
}

.chart-content-left-item, .chart-content-right-item {
  width: 100%;
  flex: 1; /* 使每个项占据相等空间 */
  margin-bottom: 10px; /* 可根据需要调整 */
}

/* 媒体查询示例 */
@media (max-width: 768px) {

}

.office-efficiency-index {
  font-family: PingFangSC-Semibold, PingFang SC;
  background-color: #22284A;
  background-size: cover;
}

.offic-header {
  height: 9rem;
  background: url("@/assets/image/office_efficiency_header_bg.png") no-repeat center center;
}

.chart-content-left {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.offic-header .title-info {
  height: 2em;
  color: #03C2EC;
  text-align: center;
  font-size: 24px;
  font-family: 'cuhei';
  font-weight: 600;
  line-height: 2em;
  vertical-align: middle;
}

.content {
  display: flex;
  justify-content: space-between;
}

/*大屏*/
/*头部样式*/
//.office-header {
//  height: 9rem;
//  background: url("@/assets/images/office_efficiency_header_bg.png") no-repeat center center;
//  background-size: 100% 100%;
//}

</style>