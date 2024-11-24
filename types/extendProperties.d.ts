import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        // $http: typeof import('vue-axios') // 这里填类型
        // $cookies: typeof import('vue-cookies')
    }
}
// 必须导出，才能在其他文件中使用
export default ComponentCustomProperties
