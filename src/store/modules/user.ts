import { reactive, ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
// import { useTagsViewStore } from './tags-view'
// import { useSettingsStore } from './settings'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { routerHistory, resetRouter } from '@/router/index'
import { loginApi, getUserInfoApi } from '@/api/login'
// import { usePermissionStore } from './permission'
// import { type LoginRequestData } from '@/api/login/types/login'
// import { type RouteRecordRaw } from 'vue-router'
// import routeSettings from '@/config/route'
// const routeSettings = {
//     async: true,
//     defaultRoles: ['DEFAULT_ROLE'],
//     thirdLevelRouteCache: false
// }

interface UserInfo {
    userName: string
    roleList: string[]
    userId: string
}

export const useUserStore = defineStore('user', () => {
    const token = ref<string>(getToken() || '')
    const roleList = ref<string[]>([]) // 暂时没有角色功能 预留着
    const userName = ref<string>('')
    const userId = ref<string>('')

    const userInfo: UserInfo = reactive({
        userName: '',
        roleList: ['admin'],
        userId: ''
    })

    // const tagsViewStore = useTagsViewStore()
    // const settingsStore = useSettingsStore()

    /** 设置角色数组 */
    const setRoles = (value: string[]) => {
        roleList.value = value
    }
    /** 登录 */
    const login = async ({ phone, password }: any) => {
        const { token: tokenNew } = await loginApi({ phone, password })
        console.log(tokenNew, 'token')
        setToken(tokenNew)
        token.value = tokenNew
        return tokenNew
        // return afterLoginAction()
    }

    /** 获取用户详情 */
    const getUserInfoAction = async (param: any) => {
        const {
            userName: userNameNew,
            roleList: roleListNew,
            userId: userIdNew
        } = await getUserInfoApi(param)
        userName.value = userNameNew
        // 验证返回的 roleList 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
        roleList.value = roleListNew?.length > 0 ? roleListNew : ['admin']
        userId.value = userIdNew
        userInfo.roleList = roleListNew
        userInfo.userName = userNameNew
        userInfo.userId = userIdNew
        // return new Promise((resolve, reject) => {
        //     try {
        //         setTimeout(() => {
        //             resolve({
        //                 userName: '我是张克难',
        //                 roles: ['admin']
        //             })
        //         }, 2000)
        //     } catch (error) {
        //         reject(error)
        //     }
        // })
        return { userName: userNameNew, roleList: roleListNew, userId: userIdNew }
    }
    async function afterLoginAction(): Promise<UserInfo | null> {
        if (!token.value) return null
        // get user info
        console.log(222)
        const userInfoRes: UserInfo = await getUserInfoAction({ token: token.value })
        // const permissionStore = usePermissionStore()
        // if (!permissionStore.isDynamicAddedRoute) {
        //     const routes = await permissionStore.buildRoutesAction()
        //     routes.forEach((route) => {
        //         router.addRoute(route as unknown as RouteRecordRaw)
        //     })
        //     router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
        //     permissionStore.setDynamicAddedRoute(true)
        // }
        userInfo.roleList = userInfoRes.roleList
        userInfo.userName = userInfoRes.userName
        userInfo.userId = userInfoRes.userId
        const permissionStore = usePermissionStore()
        const routes = await permissionStore.buildRoutesAction()
        routes.forEach((route: any) => {
            routerHistory.addRoute(route)
        })
        // router.addRoute(PAGE_NOT_FOUND_ROUTE)
        permissionStore.setDynamicAddedRoute(true)

        const params = new URLSearchParams(window.location.href.split('?')[1])
        let redirectValue = params.get('redirect')

        // 获取redirect字段的值
        console.log(routes, redirectValue, 'afterLoginAction')
        if (redirectValue) {
            redirectValue = decodeURIComponent(redirectValue)
        }
        await routerHistory.replace(redirectValue || '/')
        return userInfoRes
    }

    /** 切换角色 */
    const changeRoles = async (role: string) => {
        const newToken = 'token-' + role
        token.value = newToken
        setToken(newToken)
        await getUserInfoAction(role)
        // permissionStore.setRoutes(roles.value)
        resetRouter()
        // permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
        //     router.addRoute(item)
        // })
        _resetTagsView()
    }
    // async function logout(goLogin = false) {
    //     if (this.getToken) {
    //       try {
    //         await doLogout()
    //       } catch {
    //         console.log('注销Token失败')
    //       }
    //     }
    //     this.setToken(undefined)
    //     this.setSessionTimeout(false)
    //     this.setUserInfo(null)
    //     goLogin && router.push(PageEnum.BASE_LOGIN)
    // }
    /** 登出 */
    const logout = () => {
        removeToken()
        token.value = ''
        roleList.value = []
        resetRouter()
        _resetTagsView()
    }
    /** 重置 Token */
    const resetToken = () => {
        removeToken()
        token.value = ''
        roleList.value = []
    }
    /** 重置 Visited Views 和 Cached Views */
    const _resetTagsView = () => {
        // if (!settingsStore.cacheTagsView) {
        //     tagsViewStore.delAllVisitedViews()
        //     tagsViewStore.delAllCachedViews()
        // }
    }

    return {
        userInfo,
        userId,
        token,
        roleList,
        login,
        userName,
        setRoles,
        getUserInfoAction,
        changeRoles,
        afterLoginAction,
        logout,
        resetToken
    }
})

/** 在 setup 外使用 */
export function useUserStoreWithOut() {
    return useUserStore(store)
}
