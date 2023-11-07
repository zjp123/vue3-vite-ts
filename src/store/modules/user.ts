import { reactive, ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
// import { usePermissionStore } from './permission'
// import { useTagsViewStore } from './tags-view'
// import { useSettingsStore } from './settings'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { resetRouter } from '@/router/index'
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
    roles: string[]
    userId: string
}

export const useUserStore = defineStore('user', () => {
    const token = ref<string>(getToken() || '')
    const roles = ref<string[]>([]) // 暂时没有角色功能 预留着
    const username = ref<string>('')

    const userInfo: UserInfo = reactive({
        userName: '',
        roles: ['admin'],
        userId: ''
    })

    // const permissionStore = usePermissionStore()
    // const tagsViewStore = useTagsViewStore()
    // const settingsStore = useSettingsStore()

    /** 设置角色数组 */
    const setRoles = (value: string[]) => {
        roles.value = value
    }
    /** 登录 */
    const login = async ({ username, password, code }: any) => {
        const { data } = await loginApi({ username, password, code })
        console.log(data, 'token')
        setToken(data.token)
        token.value = data.token
        return afterLoginAction()
    }

    /** 获取用户详情 */
    const getInfo = async (param: any) => {
        const { data } = await getUserInfoApi(param)
        username.value = data.username
        // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
        roles.value = data.roles?.length > 0 ? data.roles : ['admin']
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
        return data
    }

    // const getParamFn = () => {
    //     const params = new URLSearchParams(window.href.split('?')[1])
    //     const redirectValue = params.get('redirect')
    //     return redirectValue
    // }

    async function afterLoginAction(): Promise<UserInfo | null> {
        if (!token.value) return null
        // get user info
        const userInfo: UserInfo = await getInfo({ token: token.value })
        // const permissionStore = usePermissionStore()
        // if (!permissionStore.isDynamicAddedRoute) {
        //     const routes = await permissionStore.buildRoutesAction()
        //     routes.forEach((route) => {
        //         router.addRoute(route as unknown as RouteRecordRaw)
        //     })
        //     router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
        //     permissionStore.setDynamicAddedRoute(true)
        // }
        // await router.replace('/')
        return userInfo
    }
    // async function getUserInfoAction(): Promise<UserInfo | null> {
    //     if (!this.getToken) return null
    //     const userInfo = await getUserInfo()
    //     const { roles = [] } = userInfo
    //     if (isArray(roles)) {
    //         const roleList = roles.map((item) => item.value) as RoleEnum[]
    //         this.setRoleList(roleList)
    //     } else {
    //         userInfo.roles = []
    //         this.setRoleList([])
    //     }
    //     this.setUserInfo(userInfo)
    //     return userInfo
    // }
    /** 切换角色 */
    const changeRoles = async (role: string) => {
        const newToken = 'token-' + role
        token.value = newToken
        setToken(newToken)
        await getInfo(role)
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
        roles.value = []
        resetRouter()
        _resetTagsView()
    }
    /** 重置 Token */
    const resetToken = () => {
        removeToken()
        token.value = ''
        roles.value = []
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
        token,
        roles,
        login,
        username,
        setRoles,
        getInfo,
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
