import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { type RouteRecordRaw } from 'vue-router'
import router from '@/router/index'
// // import { flatMultiLevelRoutes } from '@/router/helper'
// // import routeSettings from '@/config/route'
// const routeSettings = {
//     async: true,
//     defaultRoles: ['DEFAULT_ROLE'],
//     thirdLevelRouteCache: false
// }

// 角色--对应该角色下的路由--该路由，由管理员配置是否开启
/*
[{
    roleType: 'admin',
    rotuters: ['/about', '/help']
}]
*/

// const hasPermission = (roles: string[], route: RouteRecordRaw) => {
//     const routeRoles: any = route.meta?.roles
//     return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true
// }

// const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
//     const res: RouteRecordRaw[] = []
//     routes.forEach((route) => {
//         const tempRoute = { ...route }
//         if (hasPermission(roles, tempRoute)) {
//             if (tempRoute.children) {
//                 tempRoute.children = filterAsyncRoutes(tempRoute.children, roles)
//             }
//             res.push(tempRoute)
//         }
//     })
//     return res
// }

export const usePermissionStore = defineStore('permission', () => {
    const routes = ref<RouteRecordRaw[]>([])
    const dynamicRoutes = ref<RouteRecordRaw[]>([])

    const setRoutes = () => {
        // const accessedRoutes = routeSettings.async
        //     ? filterAsyncRoutes(asyncRoutes, roles)
        //     : asyncRoutes
        // routes.value = constantRoutes.concat(accessedRoutes)
        // dynamicRoutes.value = routeSettings.thirdLevelRouteCache
        //     ? flatMultiLevelRoutes(accessedRoutes)
        //     : accessedRoutes
        routes.value = router.getRoutes()
        dynamicRoutes.value = []
    }

    return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreWithout() {
    return usePermissionStore(store)
}
