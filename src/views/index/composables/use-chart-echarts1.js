import {ref} from 'vue'
import * as echarts from 'echarts'

export default function () {
    let chartRef = ref()

    const getOption = () => {
        return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        }
    }

    const initChart = () => {
        const option = getOption()

        chartRef.value = echarts.init(chartRef.value)
        chartRef.value && chartRef.value.setOption(option)
    }

    const resizeChart = () => {
        if (chartRef.value) {
            window.addEventListener('resize', function () {
                chartRef.value.resize()
            })
        }
    }

    return {
        chartRef,
        initChart,
        resizeChart
    }
}