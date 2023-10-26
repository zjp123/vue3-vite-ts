import router from '@/router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { usePermissionStoreWithout } from '@/store/modules/permission'
import { ElMessage } from 'element-plus'
// import { setRouteChange } from '@/hooks/useRouteListener'
import { useTitle } from '@/hooks/useTitle'
import { getToken } from '@/utils/cookies'
// import { fixBlankPage } from '@/utils/fix-blank-page'
// import routeSettings from '@/config/route'
// import isWhiteList from '@/config/white-list'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { setTitle } = useTitle()
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
    console.log(888)

    // fixBlankPage()
    NProgress.start()
    const userStore = useUserStoreWithOut()
    const permissionStore = usePermissionStoreWithout()
    const token = getToken()

    // 判断该用户是否已经登录
    if (!token) {
        // 如果在免登录的白名单中，则直接进入
        // if (isWhiteList(to)) {
        //     next()
        // } else {
        // 其他没有访问权限的页面将被重定向到登录页面
        if (to.path !== '/login') {
            NProgress.done()
            next({ path: '/login', replace: true })
            return
        } else {
            next() // 程序往下走
            return
        }
    }

    // 如果已经登录，并准备进入 Login 页面，则重定向到主页
    if (to.path === '/login' && token) {
        NProgress.done()
        return next({ path: '/', replace: true })
    }
    // 如果用户已经获得其权限角色
    // if (userStore.roles.length !== 0) return next()

    // 否则要重新获取权限角色
    try {
        // if (routeSettings.async) {
        //     // 注意：角色必须是一个数组！ 例如: ['admin'] 或 ['developer', 'editor']
        //     await userStore.getInfo()
        //     const roles = userStore.roles
        //     // 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
        //     permissionStore.setRoutes(roles)
        // } else {
        //     // 没有开启动态路由功能，则启用默认角色
        //     userStore.setRoles(routeSettings.defaultRoles)
        //     permissionStore.setRoutes(routeSettings.defaultRoles)
        // }
        // 将'有访问权限的动态路由' 添加到 Router 中
        // permissionStore.dynamicRoutes.forEach((route) => router.addRoute(route))
        // 确保添加路由已完成

        /*

        // 用户已登录，检查是否已获取用户信息
        const hasUserInfo = store.getters.hasUserInfo;

        if (!hasUserInfo) {
            try {
                // 调用接口获取用户信息
                const userInfo = await api.getUserInfo();
                store.commit('setUserInfo', userInfo);
            } catch (error) {
                // 获取用户信息失败，可能是 token 过期等情况
                console.error('Failed to get user information:', error);
                // 可以跳转到登录页或者执行其他操作
                next('/login');
            }
        }
        */

        await userStore.getInfo()
        permissionStore.setRoutes()
        // permissionStore.dynamicRoutes.forEach((route) => router.addRoute(route))

        next()
        // next({ ...to, replace: true })
        return
    } catch (err: any) {
        // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
        userStore.resetToken()
        ElMessage.error(err.message || '路由守卫过程发生错误')
        NProgress.done()
        next('/login')
    }
})

router.afterEach((to) => {
    console.log(666)
    // setRouteChange(to)
    setTitle((to as any).meta.title)
    NProgress.done()
})
