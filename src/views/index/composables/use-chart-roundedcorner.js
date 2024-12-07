import {ref} from 'vue'
import * as echarts from 'echarts'

export default function () {
    let chartRef = ref()

    const getOption = () => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    return `${params.value}%`
                }
            },
            legend: {
                top: '5%',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    //             明月镜片 万新眼镜片 15.2%
                    //             ?鸿晨光学 明月镜片 10.1%
                    //         汇鼎光学 鸿晨光学 8.9%
                    //         优立光学 汇鼎光学 8.3%
                    //         新天鸿光学 优立光学 7.4%
                    //         卡尔蔡司光学（中国） 新天鸿光学 5.4%
                    // 依视路（中国） 卡尔蔡司光学（中国） 3.3%
                    // 凯米光学（嘉兴） 依视路（中国） 3.2%
                    // 豪雅（上海） 凯米光学（嘉兴） 1.8%
                    // 尼康眼镜（北京） 豪雅（上海） 1.2%
                    // 其他 尼康眼镜（北京） 0.4%
                    // 其他 34.7%
                    data: [
                        {value: 15.2, name: '万新眼镜片'},
                        {value: 10.1, name: '明月镜片'},
                        {value: 8.9, name: '鸿晨光学'},
                        {value: 8.3, name: '汇鼎光学'},
                        {value: 7.4, name: '优立光学'},
                        {value: 5.4, name: '新天鸿光学'},
                        {value: 3.3, name: '卡尔蔡司光学（中国）'},
                        {value: 3.2, name: '依视路（中国）'},
                        {value: 1.8, name: '凯米光学（嘉兴）'},
                        {value: 1.2, name: '豪雅（上海）'},
                        {value: 34.7, name: '其他'}
                    ]
                }
            ]
        };
    }

    const initChart = () => {
        const option = getOption()
        chartRef.value = echarts.init(chartRef.value)
        chartRef.value && chartRef.value.setOption(option)
    }

    const resizeChart = () => {
        chartRef.value && chartRef.value.resize()

    }
    return {
        chartRef, initChart, resizeChart
    }
}