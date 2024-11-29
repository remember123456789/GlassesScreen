import axios from "axios";
import {getStorage} from '@/utils/storage.js'

const request = axios.create({
    baseURL: 'http://localhost',
    timeout: 5000
})

request.interceptors.request.use(config => {
    // 获取token携带到请求头上
    if (getStorage('token')) {
        config.headers.token = getStorage('token')
    }
    return config
})

request.interceptors.response.use(response => {
    let {data} = response
    if (data.code !== 200) {
        return Promise.reject(data)
    }
    if (data.code === 401) {
        return Promise.reject(data)
    }
    return data
}, (error) => {
    return Promise.reject(error)
})

export default request