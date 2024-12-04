<script setup>
import {ElButton, ElRow, ElCol} from "element-plus";
import {ref, onMounted} from "vue";
import UseChartEcharts from './composables/use-chart-echarts1.js'
import ModuleItem from '@/components/mouduleItem/index.vue'

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
  <div ref="screen" class="screen-container" style="background-color: var(--bg-color-a)">
    <header class="offic-header">
      <div class="pd title-info">眼镜销量可视化大屏</div>
    </header>
    <el-row class="chart-content-row" :span="24">
      <el-col :span="6" class="chart-content-col">
        <el-row class="chart-content-left">
          <el-col :span="12" class="chart-content-left-item">
            <ModuleItem title="左上">
              <div :ref="ChartEcharts1.chartRef" style="width: 100%;height: 100%"></div>
            </ModuleItem>
          </el-col>
          <el-col :span="12" class="chart-content-left-item">
            <ModuleItem title="左下">
              <div :ref="ChartEcharts1.chartRef" style="width: 100%;height: 100%"></div>
            </ModuleItem>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="chart-content-col">
        <ModuleItem title="中间">
          <!--          <div ref="ChartEcharts1ChartRef"></div>-->
        </ModuleItem>
      </el-col>
      <el-col :span="6" class="chart-content-col">
        <el-row class="chart-content-right">
          <el-col :span="12" class="chart-content-right-item">
            <ModuleItem title="右上">和</ModuleItem>
          </el-col>
          <el-col :span="12" class="chart-content-right-item">
            <ModuleItem title="右下">和</ModuleItem>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.el-col-12 {
  max-width: 100% !important;
}

.screen-container {
  width: 100%;
  height: 100%; /* 使容器高度充满视口 */
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