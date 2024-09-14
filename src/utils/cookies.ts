import Cookies from 'js-cookie'

export const getToken = (key?: string) => {
    return Cookies.get(key || 'user_token')
}
export const setToken = (token: string, key?: string) => {
    Cookies.set(key || 'user_token', token)
}
export const removeToken = (key?: string) => {
    Cookies.remove(key || 'user_token')
}
