import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import ShallowReactiveCom from '../pages/shallowReactive.vue'
import WatcheffectCom from '../pages/watcheffect.vue'
import WXh5 from '../pages/weixinh5.vue'
import LoginCom from '../pages/login.vue'
// import NotFound from '../pages/404.vue'
import HomeCom from '../pages/home.vue'
import LAYOUT from '@/components/layout/index.vue'

export const baseRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: '/',
        component: LAYOUT,
        // component: HomeCom
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: HomeCom,
                name: 'Home', // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
                meta: {
                    title: '首页',
                    icon: 'homepage',
                    affix: true,
                    keepAlive: true,
                    alwaysShow: false
                }
            },
            {
                path: 'shallowReactive',
                name: 'ShallowReactive',
                component: ShallowReactiveCom
            },
            {
                path: '/watcheffect',
                name: 'Watcheffect',
                component: WatcheffectCom
            },
            {
                path: '/wxh5',
                name: 'Wxh5',
                component: WXh5
            }
        ]
    },
    {
        path: '/login',
        name: 'LoginCom',
        // component: LoginCom
        component: () => LoginCom
    }
    // {
    //     path: '/404',
    //     name: 'NotFound',
    //     component: NotFound
    // }
]

export const PAGE_NOT_FOUND_ROUTE: any = {
    // path: '/:path(.*)*',
    // name: 'PageNotFound',
    // // component: LAYOUT,
    // meta: {
    //     title: 'ErrorPage',
    //     hideBreadcrumb: true,
    //     hideMenu: true
    // },
    // children: [
    //     {
    //         path: '/:path(.*)*',
    //         name: 'PageNotFound',
    //         component: () => import('@/pages/exception/Exception.vue'),
    //         meta: {
    //             title: 'ErrorPage',
    //             hideBreadcrumb: true,
    //             hideMenu: true
    //         }
    //     }
    // ]
    path: '/:path(.*)*',
    name: 'PageNotFound',
    component: () => import('@/pages/exception/Exception.vue'),
    meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true
    }
}

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

export const asyncRoutes = [...routeModuleList, PAGE_NOT_FOUND_ROUTE]

export const routerHistory = createRouter({
    history: createWebHistory(),
    routes: [...baseRoutes, PAGE_NOT_FOUND_ROUTE]
})

/** 重置路由 */
export function resetRouter() {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        routerHistory.getRoutes().forEach((route) => {
            const { name, meta } = route
            if (name && (meta.roles as any)?.length) {
                routerHistory.hasRoute(name) && routerHistory.removeRoute(name)
            }
        })
    } catch {
        // 强制刷新浏览器也行，只是交互体验不是很好
        window.location.reload()
    }
}
