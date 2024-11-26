import { routerHistory } from '@/router/index'
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

routerHistory.beforeEach(async (to, _from, next) => {
    // fixBlankPage()
    NProgress.start()
    const token = getToken()

    // 判断该用户是否已经登录
    if (!token) {
        // 如果在免登录的白名单中，则直接进入
        // if (isWhiteList(to)) {
        //     next()
        // } else {
        // 其他没有访问权限的页面将被重定向到登录页面
        // }
        if (to.path !== '/login' && to.name !== 'PageNotFound') {
            NProgress.done()
            // redirect login page 这段代码是拼接  redirect 登陆后重回到这个页面
            let query = {}
            if (to.path !== '/') {
                query = {
                    redirect: to.path
                }
            }
            next({ path: '/login', replace: true, query })
            return
        } else {
            NProgress.done()
            next()
        }
    }
    const permissionStore = usePermissionStoreWithout()
    const userStore = useUserStoreWithOut()
    // get userinfo while last fetch time is empty
    // 手动刷新时 有token 没有userid
    if (!userStore.userId) {
        try {
            // 因为我的业务流程是根据token 去请求用户信息，所以这里需要判断token是否过期
            // 如果是登录时直接获取用户信息就不用这一步了
            console.log('走这了吗')
            await userStore.getUserInfoAction({ token })
        } catch (err) {
            next()
            return
        }
    }

    // 如果已经登录，并准备进入 Login 页面，则重定向到主页
    if (to.path === '/login' && token) {
        NProgress.done()
        return next({ path: '/', replace: true })
    }

    if (permissionStore.isDynamicAddedRoute) {
        console.log(to, 999)
        next()
        return
    }

    // 如果用户已经获得其权限角色--有了token 就一定有用户信息
    try {
        // 下面这段代码看似没用，但本地开发时，热更新就会找不到对应的路由，因为有的路由是动态的，调的接口
        // const routes = await permissionStore.buildRoutesAction()----记得复原
        const routes = []
        routes.forEach((route: any) => {
            routerHistory.addRoute(route)
        })
        console.log(_from, to.fullPath, routes, '哈哈哈哈哈哈啊啊啊啊啊啊啊啊啊啊啊')
        permissionStore.setDynamicAddedRoute(true)

        if (to.name === 'PageNotFound') {
            console.log(to, 888)
            // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
            next({ path: to.fullPath, replace: true, query: to.query })
            // next()
            return
        } else {
            const redirectPath = (_from.query.redirect || to.path) as string
            const redirect = decodeURIComponent(redirectPath)
            const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
            next(nextData)
            // next()
            return
        }
        // next()
        // return
    } catch (err: any) {
        // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
        userStore.resetToken()
        ElMessage.error(err.message || '路由守卫过程发生错误')
        NProgress.done()
        next('/login')
    }
})

routerHistory.afterEach((to) => {
    console.log(666)
    // setRouteChange(to)
    setTitle((to as any).meta.title)
    NProgress.done()
})
