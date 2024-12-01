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
  <div ref="screen" style="background-color: var(--bg-color-a)">
    <header class="offic-header">
      <div class="col-sm-12 col-md-12 pd  title-info">眼镜销量可视化大屏</div>
    </header>
    <el-row :gutter="15" class="chart-content-row">
      <el-col class="chart-content-col" :span="4">
        <el-row class="chart-content-left">
          <el-col class="chart-content-left-item">
            <ModuleItem title="左上">
            </ModuleItem>
          </el-col>
          <el-col class="chart-content-left-item">
            <ModuleItem title="左下">
            </ModuleItem>
          </el-col>
        </el-row>
      </el-col>
      <!--      中间-->
      <el-col class="chart-content-col" :span="14">
        <ModuleItem title="中间">
          <div :ref="ChartEcharts1.chartRef" style="width: 100%; height: 500px;"></div>
        </ModuleItem>

      </el-col>
      <el-col class="chart-content-col" :span="6">
        <el-row class="chart-content-right">
          <el-col class="chart-content-right-item">
            <ModuleItem title="右上">
              和
            </ModuleItem>
          </el-col>
          <el-col class="chart-content-right-item">
            <ModuleItem title="右下">
              和
            </ModuleItem>

          </el-col>

        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
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
.chart-content-left {
}

.chart-content-right {
  width: auto;
}

.chart-content {
  height: calc(100% - 77px);
  margin-top: 12px;

  .chart-content-row,
  .chart-content-col {
    height: 100%;
    //display: block;
    //width: 100%;
    display: flex;
  }

  .chart-container {
    width: 100%;
    height: 100%;
  }

  .virtual-list-content {
    display: flex;
    flex-direction: column;
    height: 98%;
    padding: 0 8px;

    .virtual-list-item {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 4px;
      color: rgb(255 255 255);
      cursor: pointer;

      &:hover {
        color: #68d8ff;
        background: rgb(255 255 255 / 10%);
      }

      &-col {
        width: 16%;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-col:nth-child(1) {
        width: 19.5%;
        text-align: left;
      }
    }
  }

  &-left {
    flex-direction: column;
    row-gap: 8px !important;
    height: 100%;

    &-item:nth-child(1) {
      flex: 2;
    }

    &-item:nth-child(2) {
      flex: 1;
    }
  }

  &-center {
    flex-direction: column;
    row-gap: 8px !important;
    height: 100%;

    &-item:nth-child(1) {
      flex: 2;

      .index-data {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 16px;
      }
    }

    &-item:nth-child(2) {
      flex: 1;
    }
  }

  &-right {
    flex-direction: column;
    row-gap: 8px !important;
    height: 100%;

    &-item {
      flex: 1;
    }
  }
}

</style>