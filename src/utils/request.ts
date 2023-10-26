import axios, { type AxiosInstance } from 'axios'
import { useUserStoreWithOut } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { get, merge } from 'lodash-es'
import { getToken } from './cookies'
import { objectIsValid } from './index'

// type BlobPart = string | BufferSource | Blob

/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
    useUserStoreWithOut().logout()
    location.reload()
}

/** 创建请求实例 */
function createService() {
    // 创建一个 axios 实例命名为 service
    const service = axios.create({
        baseURL: import.meta.env.VITE_BASE_API, // api的base_url
        // baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.BASE_API,
        timeout: 10000 // 请求超时时间,
        // withCredentials:true 跨域请求时 是否携带cookie等
    })
    // 请求拦截
    service.interceptors.request.use(
        (config) => {
            const token = getToken()
            const defaultConfig = {
                headers: {
                    // 携带 Token
                    Authorization: token ? `Bearer ${token}` : undefined,
                    'Content-Type': 'application/json'
                },
                timeout: 5000,
                baseURL: import.meta.env.VITE_BASE_API,
                data: {}
            }
            const mergeConfig = merge(config, defaultConfig)
            return mergeConfig
        },
        // 发送失败
        (error) => Promise.reject(error)
    )
    // 响应拦截（可根据具体业务作出相应的调整）
    service.interceptors.response.use(
        (response) => {
            const responseData = response.data
            if (responseData.code === 200) {
                return responseData
            } else if (responseData.code === 401) {
                ElMessage.error(responseData.message)
                //清除cookie
                setTimeout(() => {
                    return logout()
                }, 1000)
            } else {
                // 其他业务错误
                ElMessage.error(responseData.message)
                return false
            }
        },
        (error) => {
            // status 是 HTTP 状态码
            const status = get(error, 'response.status')
            switch (status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    // Token 过期时
                    logout()
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = '请求地址出错'
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP 版本不受支持'
                    break
                default:
                    break
            }
            ElMessage.error(error.message)
            return Promise.reject(error)
        }
    )
    return service
}

/** 创建请求方法 */
function createRequest(service: AxiosInstance) {
    // return function <T>(config: AxiosRequestConfig): Promise<T> {
    //     const token = getToken()
    //     const defaultConfig = {
    //         headers: {
    //             // 携带 Token
    //             Authorization: token ? `Bearer ${token}` : undefined,
    //             'Content-Type': 'application/json'
    //         },
    //         timeout: 5000,
    //         baseURL: import.meta.env.VITE_BASE_API,
    //         data: {}
    //     }
    //     // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    //     const mergeConfig = merge(defaultConfig, config)
    //     return service(mergeConfig)
    // }
    return {
        fetchGet(url: string, param = {}, cache = false) {
            return new Promise((resolve, reject) => {
                const headers = {}
                if (!cache) {
                    // 不允许缓存
                    // headers = {
                    //     Pragma: 'no-cache',
                    //     'Cache-Control': 'must-revalidate,no-cache,no-store',
                    //     Expires: 0
                    // }
                }
                service
                    .get(url, {
                        params: param,
                        headers: headers
                    })
                    .then((res) => {
                        if (objectIsValid(res)) {
                            resolve(res)
                        } else {
                            console.log('service.get 出错了')
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchPost(url: string, params = {}, baseUrl = 'BASE_API') {
            return new Promise((resolve, reject) => {
                service
                    .post(url, {
                        data: params
                    })
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        fetchPostFormBody(url: string, params = {}) {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            return new Promise((resolve, reject) => {
                service
                    .post(url, params, config)
                    .then((res) => {
                        if (res) {
                            resolve(res)
                        } else {
                            console.log('service.post 出错了')
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // fetchDelete(url: string, params = {}) {
        //     return new Promise((resolve, reject) => {
        //         service
        //             .delete(url, qs.stringify(params))
        //             .then((res) => {
        //                 if (objectIsValid(res)) {
        //                     if (objectIsValid(res.message)) {
        //                         resolve(res)
        //                     } else {
        //                         resolve(res.data)
        //                     }
        //                 } else {
        //                     console.log('service.delete 出错了')
        //                 }
        //             })
        //             .catch((error) => {
        //                 reject(error)
        //             })
        //     })
        // },
        upload(url: string, params = {}) {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            return new Promise((resolve, reject) => {
                service
                    .post(url, params, config)
                    .then((res: any) => {
                        if (objectIsValid(res)) {
                            if (objectIsValid(res.message)) {
                                resolve(res)
                            } else {
                                resolve(res.data)
                            }
                        } else {
                            console.log('service.post 出错了')
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // download(url: string, params = {}, filename: string | string[]) {
        //     return new Promise((resolve, reject) => {
        //         service
        //             .post(url, qs.stringify(params), {
        //                 responseType: 'arraybuffer'
        //             })
        //             .then((res) => {
        //                 const blob = new Blob([res], {
        //                     type: 'application/vnd.ms-excel'
        //                 })

        //                 if (window.navigator.msSaveBlob) {
        //                     try {
        //                         if (objectIsValid(filename)) {
        //                             filename =
        //                                 filename.indexOf('.xlsx') >= 0 ||
        //                                 filename.indexOf('.xls') >= 0
        //                                     ? filename
        //                                     : filename + '.xls'
        //                         }
        //                         window.navigator.msSaveBlob(blob, filename)
        //                         resolve()
        //                     } catch (e) {
        //                         console.log(e)
        //                     }
        //                 } else {
        //                     const link = document.createElement('a')
        //                     console.log(link)
        //                     document.body.appendChild(link)
        //                     link.href = window.URL.createObjectURL(blob)
        //                     if (objectIsValid(filename)) {
        //                         link.download =
        //                             filename.indexOf('.xlsx') >= 0 || filename.indexOf('.xls') >= 0
        //                                 ? filename
        //                                 : filename + '.xls'
        //                     }

        //                     link.click()

        //                     document.body.removeChild(link)
        //                     resolve()
        //                 }
        //             })
        //             .catch((error) => {
        //                 reject(error)
        //             })
        //     })
        // },
        downloadZip(url: string, data: any, fileName: any) {
            return new Promise<void>((resolve, reject) => {
                service
                    .post(url, {
                        data,
                        responseType: 'blob'
                    })
                    .then((res: any) => {
                        const blob = new Blob([res], {
                            type: 'application/zip'
                        })
                        const url = window.URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        document.body.appendChild(link)
                        link.href = url
                        if (fileName) {
                            link.download = `${fileName}.zip`
                        }
                        // link.download = `111.zip`
                        link.click()
                        document.body.removeChild(link)
                        URL.revokeObjectURL(url)
                        resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        downloadJson(url: string, params = {}, filename: string) {
            return new Promise<void>((resolve, reject) => {
                service
                    .post(url, params, {
                        responseType: 'arraybuffer'
                    })
                    .then((res: any) => {
                        const blob = new Blob([res], {
                            type: 'application/vnd.ms-excel'
                        })

                        if (window.navigator?.msSaveBlob) {
                            try {
                                if (objectIsValid(filename)) {
                                    filename =
                                        filename.indexOf('.xlsx') >= 0 ||
                                        filename.indexOf('.xls') >= 0
                                            ? filename
                                            : filename + '.xls'
                                }
                                window.navigator.msSaveBlob(blob, filename)
                                resolve()
                            } catch (e) {
                                console.log(e)
                            }
                        } else {
                            const link = document.createElement('a')
                            console.log(link)
                            document.body.appendChild(link)
                            link.href = window.URL.createObjectURL(blob)
                            if (objectIsValid(filename)) {
                                link.download =
                                    filename.indexOf('.xlsx') >= 0 || filename.indexOf('.xls') >= 0
                                        ? filename
                                        : filename + '.xls'
                            }

                            link.click()

                            document.body.removeChild(link)
                            resolve()
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        readTxtFile(url: string) {
            return new Promise((resolve, reject) => {
                service
                    .get(url, {
                        responseType: 'text/plain' as any
                    })
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}

/** 用于网络请求的实例 */
const service = createService()
/** 用于网络请求的方法 */
export const request = createRequest(service)
