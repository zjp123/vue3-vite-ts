import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import ShallowReactiveCom from '../pages/shallowReactive.vue'
import WatcheffectCom from '../pages/watcheffect.vue'
import WXh5 from '../pages/weixinh5.vue'
import LoginCom from '../pages/login.vue'
import NotFound from '../pages/404.vue'
import HomeCom from '../pages/home.vue'
import LAYOUT from '@/components/layout/index.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: HomeCom
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
    },
    {
        path: '/login',
        name: 'LoginCom',
        component: LoginCom
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound
    }
]

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
// const modules = import.meta.globEager('./modules/**/*.ts')
const modules: any = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: any[] = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
})

export const asyncRoutes = [...routeModuleList]

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

export const PAGE_NOT_FOUND_ROUTE: any = {
    path: '/:path(.*)*',
    name: 'PageNotFound',
    component: LAYOUT,
    meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true
    },
    children: [
        {
            path: '/:path(.*)*',
            name: 'PageNotFound',
            component: () => import('@/pages/exception/Exception.vue'),
            meta: {
                title: 'ErrorPage',
                hideBreadcrumb: true,
                hideMenu: true
            }
        }
    ]
}

export default router
