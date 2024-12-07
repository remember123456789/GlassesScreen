import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'

export default function () {
    let chartRef = ref()

    const getOption = () => {
        return {
            tooltip: {
                show: true,
                position: 'top'
                // trigger: 'item'
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    width: 200
                }
            },
            series: [
                {
                    name: '平均数',
                    data: [],
                    type: 'bar'
                }
            ]
        }
    }

    const initChart = (data) => {
        const option = getOption()
        if (data) {
            data.forEach(v => {
                option.xAxis.data.push(v.name)
                option.series[0].data.push(Number(v.value))
            })
        }
        chartRef.value = echarts.init(chartRef.value)
        chartRef.value && chartRef.value.setOption(option)
    }

    const resizeChart = () => {
        if (chartRef.value) {
            chartRef.value && chartRef.value.resize()
        }

    }


    return {
        chartRef,
        initChart,
        resizeChart
    }
}