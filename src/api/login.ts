import { request } from '../utils/request'

export async function getUserInfoApi(data = {}) {
    // return request.fetchPost('/api/getUserInfo', data)
    console.log(data, 'getUserInfoApi')
    return request.fetchPost<any>(
        '',
        {},
        '',
        await new Promise<any>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve({
                        code: 200,
                        data: {
                            userName: '我是张克难',
                            roles: ['admin']
                        },
                        messsage: 'ok'
                    })
                }, 2000)
            } catch (error) {
                reject(error)
            }
        })
    )
}

export async function loginApi(data = {}) {
    // return request.fetchPost('/api/login', data)
    console.log(data, 'loginApiloginApi')
    return request.fetchPost(
        '',
        {},
        '',
        await new Promise<any>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve({
                        code: 200,
                        data: {
                            token: 'xxxll-kjksk-888'
                        },
                        messsage: 'ok'
                    })
                }, 2000)
            } catch (error) {
                reject(error)
            }
        })
    )
}
