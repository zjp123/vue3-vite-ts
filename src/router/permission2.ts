import { routerHistory as router } from '@/router'
import { useUserStore, usePermissionStore } from '@/store'
import type { RouteRecordRaw } from 'vue-router'
// import { TOKEN_KEY } from '@/enums/CacheEnum'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/cookies'

export function setupPermission() {
    // 白名单路由
    const whiteList = ['/login']

    router.beforeEach(async (to, from, next) => {
        NProgress.start()
        const hasToken = getToken()

        if (hasToken) {
            console.log('0000000')
            if (to.path === '/login') {
                // 如果已登录，跳转首页
                next({ path: '/' })
                NProgress.done()
            } else {
                const userStore = useUserStore()
                const permissionStore = usePermissionStore()
                console.log(permissionStore, permissionStore.isDynamicAddedRoute, 11111)
                if (!permissionStore.isDynamicAddedRoute) {
                    try {
                        const accessRoutes = await permissionStore.buildRoutesAction()
                        accessRoutes.forEach((route: RouteRecordRaw) => {
                            router.addRoute(route)
                        })
                        permissionStore.setDynamicAddedRoute(true)

                        // userStore.getLoginInfo()
                        next({ ...to, replace: true })
                    } catch (error) {
                        // 移除 token 并跳转登录页
                        await userStore.resetToken()
                        next(`/login?redirect=${to.path}`)
                        NProgress.done()
                    }
                } else {
                    // 未匹配到任何路由，跳转404
                    if (to.matched.length === 0) {
                        from.name ? next({ name: from.name }) : next('/404')
                    } else {
                        next()
                    }
                }
            }
        } else {
            console.log('2222222')
            // 未登录可以访问白名单页面
            if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                NProgress.done()
                if (to.path === '/login') {
                    next()
                } else {
                    next({ path: `/login?redirect=${to.path}` })
                    NProgress.done()
                }
            }
        }
    })

    router.afterEach(() => {
        NProgress.done()
    })
}
