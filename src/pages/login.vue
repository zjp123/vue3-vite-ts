<template>
    <div>
        <el-button :loading="loading" @click="handleLogin">这是登陆页面</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
const loading = ref(false)
const userStore = useUserStore()

async function handleLogin() {
    // const data = await validForm()
    // if (!data) return
    try {
        loading.value = true
        const userInfo: any = await userStore.login({
            password: '123456',
            username: 'admin',
            mode: 'none' //不要默认的错误提示
        })
        console.log(userInfo, 'userInfouserInfo')
        if (userInfo) {
            ElMessage({
                showClose: true,
                message: '登录成功',
                type: 'success'
            })
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
