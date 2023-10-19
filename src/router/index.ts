import { createRouter, createWebHistory } from 'vue-router'
import ShallowReactiveCom from '../pages/shallowReactive.vue'
import WatcheffectCom from '../pages/watcheffect.vue'
import WXh5 from '../pages/weixinh5.vue'

const routes = [
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

/** 重置路由 */
export function resetRouter() {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        router.getRoutes().forEach((route) => {
            const { name, meta } = route
            if (name && meta.roles?.length) {
                router.hasRoute(name) && router.removeRoute(name)
            }
        })
    } catch {
        // 强制刷新浏览器也行，只是交互体验不是很好
        window.location.reload()
    }
}

export default router
