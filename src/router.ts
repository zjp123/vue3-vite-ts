import { createRouter, createWebHistory } from 'vue-router'
import ShallowReactiveCom from './pages/shallowReactive.vue'
import WatcheffectCom from './pages/watcheffect.vue'
import WXh5 from './pages/weixinh5.vue'
// npm i vite-plugin-webpackchunkname -D

const routes = [
    {
        path: '/',
        component: () => import('@/pages/Home/index.vue')
    },
    {
        path: '/shallowReactive',
        name: 'shallowReactive',
        component: ShallowReactiveCom
    },
    {
        path: '/watcheffect',
        name: 'watcheffect',
        component: WatcheffectCom
    },
    {
        path: '/wxh5',
        name: 'wxh5',
        component: WXh5
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
