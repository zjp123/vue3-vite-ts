<template>
    <div>
        <el-button :loading="loading" @click="handleLogin">这是登陆页面</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { LocationQuery, LocationQueryValue } from 'vue-router'
const loading = ref(false)
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

async function handleLogin() {
    // const data = await validForm()
    // if (!data) return
    try {
        loading.value = true
        // const userInfo: any = await userStore.login({
        const token: any = await userStore.login({
            password: '123456',
            username: 'admin',
            mode: 'none' //不要默认的错误提示
        })
        // console.log(userInfo, 'userInfouserInfo')
        console.log(token, 'userInfouserInfo')
        if (token) {
            ElMessage({
                showClose: true,
                message: '登录成功',
                type: 'success'
            })
            const query: LocationQuery = route.query
            const redirect = (query.redirect as LocationQueryValue) ?? '/'
            const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
            router.push({ path: redirect, query: otherQueryParams })
        }
    } catch (error) {
        loading.value = false
        console.log(error)
        ElMessage({
            showClose: true,
            message: '登录失败',
            type: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>
<style lang="less"></style>
