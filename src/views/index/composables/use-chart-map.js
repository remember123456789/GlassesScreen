import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'

export default function () {
    let chartRef = ref()

    const getOption = () => {
        return {
            series: {
                type: 'map',
                map: 'china',
                //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                // roam: true,
                label: {
                    show: false,
                    formatter: (params) => {
                        return params.name
                    }
                },
                geo: {
                    layoutSize: '200%',
                    layoutCenter: ['50%', '50%'],
                },
                data: [{
                    name: '湖南省',
                    value: 200
                }, {
                    name: '四川省',
                    value: 200
                },
                    {
                        name: '浙江省',
                        value: 200
                    }, {
                        name: '福建省',
                        value: 200
                    }, {
                        name: '河南省',
                        value: 200
                    }, {
                        name: '重庆省',
                        value: 200
                    }, {
                        name: '江西省',
                        value: 200
                    }
                ]
            },
            visualMap: {
                min: 1111,
                max: 333332,
                inRange: {
                    color: ['#00A1D1']
                }
            }
        }
    }

    const initChart = (data) => {
        const option = getOption()
        chartRef.value = echarts.init(chartRef.value)
        echarts.registerMap('china', data);
        chartRef.value && chartRef.value.setOption(option)
    }

    const resizeChart = () => {
        if (chartRef.value) {
            chartRef.value && chartRef.value.resize()
        }
    }
    // onMounted(() => {
    //     chartRef.value && initChart()
    // })

    return {
        chartRef,
        initChart,
        resizeChart
    }
}