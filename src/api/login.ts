import { request } from '../utils/request'

export async function getUserInfoApi(data = {}) {
    // return request.fetchPost('/api/getUserInfo', data)
    console.log(data, 'getUserInfoApi')
    return request.fetchPost('http://zjpzjp.com/api/getUserInfo', data)
    // return request.fetchPost<any>(
    //     '',
    //     {},
    //     '',
    //     await new Promise<any>((resolve, reject) => {
    //         try {
    //             setTimeout(() => {
    //                 resolve({
    //                     code: 200,
    //                     data: {
    //                         userName: '我是张克难',
    //                         roleList: ['admin'],
    //                         userId: 'zjp_888'
    //                     },
    //                     messsage: 'ok'
    //                 })
    //             }, 2000)
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // )
}

export async function registerApi(data = {}) {
    // return request.fetchPost('/api/getUserInfo', data)
    console.log(data, 'getUserInfoApi')
    return request.fetchPost('http://zjpzjp.com/api/register', data)
}

export async function loginApi(data = {}) {
    // return request.fetchPost('/api/login', data)
    console.log(data, 'loginApiloginApi')
    return request.fetchPost('http://zjpzjp.com/api/login', data)
    // return request.fetchPost(
    //     '',
    //     {},
    //     '',
    //     await new Promise<any>((resolve, reject) => {
    //         try {
    //             setTimeout(() => {
    //                 resolve({
    //                     code: 200,
    //                     data: {
    //                         token: 'xxxll-kjksk-888'
    //                     },
    //                     messsage: 'ok'
    //                 })
    //             }, 2000)
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // )
}

export async function getMenuListApi(data) {
    return request.fetchPost('http://zjpzjp.com/api/getUserInfo', data)
    // return request.fetchPost<any>(
    //     '',
    //     {},
    //     await new Promise<any>((resolve, reject) => {
    //         try {
    //             setTimeout(() => {
    //                 resolve({
    //                     code: 200,
    //                     data: {
    //                         menuList: [
    //                             {
    //                                 path: '/sys',
    //                                 name: '系统管理',
    //                                 component: 'LAYOUT',
    //                                 redirect: '/sys/roles',
    //                                 meta: {
    //                                     orderNo: 10,
    //                                     icon: 'ion:grid-outline'
    //                                     // title: t('routes.dashboard.dashboard')
    //                                 },
    //                                 children: [
    //                                     {
    //                                         path: 'roles',
    //                                         name: '角色管理',
    //                                         component: '/sys/roles/index',
    //                                         meta: {
    //                                             // affix: true,
    //                                             // title: t('routes.dashboard.analysis')
    //                                             currentActiveMenu: '/sys',
    //                                             icon: 'bx:bx-home',
    //                                             title: '角色管理'
    //                                         }
    //                                     },
    //                                     {
    //                                         path: 'permissions',
    //                                         name: '权限管理',
    //                                         component: '/sys/permissions/index',
    //                                         meta: {
    //                                             // title: t('routes.dashboard.workbench')
    //                                             title: '角色管理',
    //                                             currentActiveMenu: '/sys'
    //                                         }
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     },
    //                     messsage: 'ok'
    //                 })
    //             }, 2000)
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // )
}
