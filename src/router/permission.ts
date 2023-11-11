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
        // }
        if (to.path !== '/login') {
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
            next() // 程序往下走
            return
        }
    }

    // 如果已经登录，并准备进入 Login 页面，则重定向到主页
    if (to.path === '/login' && token) {
        NProgress.done()
        return next({ path: '/', replace: true })
    }
    // 如果用户已经获得其权限角色--有了token 就一定有用户信息
    try {
        const routes = await permissionStore.buildRoutesAction()
        routes.forEach((route: any) => {
            router.addRoute(route)
        })
        console.log(_from, to, routes, '哈哈哈哈哈哈啊啊啊啊啊啊啊啊啊啊啊')

        if (!to.name) {
            // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
            next({ path: to.fullPath, replace: true, query: to.query })
            return
        } else {
            // console.log(999)
            // if (_from.path === to.path) return
            // const redirectPath = (_from.query.redirect || to.path) as string
            // const redirect = decodeURIComponent(redirectPath)
            // const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
            // next(nextData)
            // return
            next()
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

router.afterEach((to) => {
    console.log(666)
    // setRouteChange(to)
    setTitle((to as any).meta.title)
    NProgress.done()
})
