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
    const isDynamicAddedRoute = ref(false)
    // const dynamicRoutes = ref<RouteRecordRaw[]>([])
    // 构建路由
    async function buildRoutesAction(): Promise<any[]> {
        // const { t } = useI18n()
        // const userStore = useUserStore()
        // const appStore = useAppStoreWithOut()
        let routes: any[] = []
        let { menuList: routeList } = await getMenuListApi({})
        console.log(routeList, 'getMenuListApi')
        routeList = transformObjToRoute(routeList)
        //  后台路由到菜单结构
        const backMenuList = transformRouteToMenu(routeList)
        menuList.value = backMenuList

        routeList = flatMultiLevelRoutes(routeList)
        routes = [...baseRoutes, PAGE_NOT_FOUND_ROUTE, ...routeList]
        /**
         * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
         * */
        // const patchHomeAffix = (routes: any[]) => {
        //     if (!routes || routes.length === 0) return
        //     let homePath: string = '/'
        //     function patcher(routes: any[], parentPath = '') {
        //         if (parentPath) parentPath = parentPath + '/'
        //         routes.forEach((route: any) => {
        //             const { path, children, redirect } = route
        //             const currentPath = path.startsWith('/') ? path : parentPath + path
        //             if (currentPath === homePath) {
        //                 if (redirect) {
        //                     homePath = route.redirect! as string
        //                 } else {
        //                     route.meta = Object.assign({}, route.meta, { affix: true })
        //                     throw new Error('end')
        //                 }
        //             }
        //             children && children.length > 0 && patcher(children, currentPath)
        //         })
        //     }

        //     try {
        //         patcher(routes)
        //     } catch (e) {
        //         // 已处理完毕跳出循环
        //     }
        //     return
        // }
        // patchHomeAffix(routes)
        return routes
    }

    const setDynamicAddedRoute = (value: boolean) => {
        isDynamicAddedRoute.value = value
    }

    return { menuList, buildRoutesAction, setDynamicAddedRoute, isDynamicAddedRoute }
})

/** 在 setup 外使用 */
export function usePermissionStoreWithout() {
    return usePermissionStore(store)
}
