import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { PAGE_NOT_FOUND_ROUTE, baseRoutes } from '@/router/index'
// import { useUserStore } from './user'
import { RouteRecordRaw } from 'vue-router'
import { getMenuListApi } from '@/api/login'
import { flatMultiLevelRoutes, transformObjToRoute, transformRouteToMenu } from '@/router/utils'
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

// declare type Recordable<T = any> = Record<string, T>
// export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
//     name: string
//     meta: RouteMeta
//     component?: Component | string
//     components?: Component
//     children?: AppRouteRecordRaw[]
//     props?: Recordable
//     fullPath?: string
// }

export const usePermissionStore = defineStore('permission', () => {
    const menuList = ref<RouteRecordRaw[]>([]) // 所有菜单
    // const dynamicRoutes = ref<RouteRecordRaw[]>([])
    // 构建路由
    async function buildRoutesAction(): Promise<any[]> {
        // const { t } = useI18n()
        // const userStore = useUserStore()
        // const appStore = useAppStoreWithOut()
        let routes: any[] = []
        let { menuList: routeList } = await getMenuListApi()
        console.log(routeList, 'getMenuListApi')
        routeList = transformObjToRoute(routeList)
        //  后台路由到菜单结构
        const backMenuList = transformRouteToMenu(routeList)
        menuList.value = backMenuList

        routeList = flatMultiLevelRoutes(routeList)
        routes = [...baseRoutes, PAGE_NOT_FOUND_ROUTE, ...routeList]
        return routes
    }

    return { menuList, buildRoutesAction }
})

/** 在 setup 外使用 */
export function usePermissionStoreWithout() {
    return usePermissionStore(store)
}
