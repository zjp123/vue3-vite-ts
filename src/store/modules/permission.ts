// import { ref } from 'vue'
// import store from '@/store'
// import { defineStore } from 'pinia'
// import { type RouteRecordRaw } from 'vue-router'
// import { constantRoutes, asyncRoutes } from '@/router/index'
// // import { flatMultiLevelRoutes } from '@/router/helper'
// // import routeSettings from '@/config/route'
// const routeSettings = {
//     async: true,
//     defaultRoles: ['DEFAULT_ROLE'],
//     thirdLevelRouteCache: false
// }

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

// export const usePermissionStore = defineStore('permission', () => {
//     const routes = ref<RouteRecordRaw[]>([])
//     const dynamicRoutes = ref<RouteRecordRaw[]>([])

//     const setRoutes = (roles: string[]) => {
//         const accessedRoutes = routeSettings.async
//             ? filterAsyncRoutes(asyncRoutes, roles)
//             : asyncRoutes
//         routes.value = constantRoutes.concat(accessedRoutes)
//         dynamicRoutes.value = routeSettings.thirdLevelRouteCache
//             ? flatMultiLevelRoutes(accessedRoutes)
//             : accessedRoutes
//     }

//     return { routes, dynamicRoutes, setRoutes }
// })

// /** 在 setup 外使用 */
// export function usePermissionStoreHook() {
//     return usePermissionStore(store)
// }
