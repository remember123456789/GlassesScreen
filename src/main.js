import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/style/element-variarbles.scss'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
