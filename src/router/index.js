import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/login/login.vue'),
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/components/layout/layout.vue'),
            children: [
                {
                    path: '/main/home',
                    name: 'home',
                    component: () => import('@/views/index/index.vue'),
                },
                {
                    path: '/main/dataImport',
                    name: 'dataImport',
                    component: () => import('@/views/DataImport/dataimport.vue'),
                }
            ]
        }
    ],
})

export default router