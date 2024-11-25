<!-- <template>
    <div>
        <el-button :loading="loading" @click="handleLogin">这是登陆页面</el-button>
    </div>
</template> -->
<template>
    <el-card class="auth-container" shadow="hover">
        <!-- 切换登录/注册 -->
        <div class="tabs">
            <el-button
                :type="activeTab === 'login' ? 'primary' : 'default'"
                @click="activeTab = 'login'"
            >
                登录
            </el-button>
            <el-button
                :type="activeTab === 'register' ? 'primary' : 'default'"
                @click="activeTab = 'register'"
            >
                注册
            </el-button>
        </div>

        <!-- 登录表单 -->
        <div v-if="activeTab === 'login'">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="80px">
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="loginForm.phone" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        placeholder="请输入密码"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 注册表单 -->
        <div v-if="activeTab === 'register'">
            <el-form
                ref="registerFormRef"
                :model="registerForm"
                :rules="registerRules"
                label-width="80px"
            >
                <!-- <el-form-item label="昵称" prop="name">
            <el-input v-model="registerForm.name" placeholder="请输入昵称" />
          </el-form-item> -->
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="registerForm.phone" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="registerForm.password"
                        type="password"
                        placeholder="请输入密码"
                    />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input
                        v-model="registerForm.confirmPassword"
                        type="password"
                        placeholder="请确认密码"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleRegister">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'LoginCom',
    inheritAttrs: false
})
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import {
    // loginApi,
    registerApi
} from '@/api/login'
import { LocationQuery, LocationQueryValue } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
// 当前激活的表单选项
const activeTab = ref<'login' | 'register'>('login')

// 登录表单
const loginForm = reactive({
    phone: '',
    password: ''
})
const loginRules = {
    phone: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const loginFormRef = ref<FormInstance>()

// 注册表单
const registerForm = reactive({
    // name: '',
    phone: '',
    password: '',
    confirmPassword: ''
})
const registerRules = {
    // name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
            validator: (_, value: string) =>
                value === registerForm.password
                    ? Promise.resolve()
                    : Promise.reject('两次密码输入不一致'),
            trigger: 'blur'
        }
    ]
}
const registerFormRef = ref<FormInstance>()

// 登录处理
const handleLogin = () => {
    loginFormRef.value?.validate(async (valid) => {
        if (valid) {
            console.log(loginForm, 'loginForm')
            const token: any = await userStore.login(loginForm)
            console.log(token, 'login')
            if (token) {
                ElMessage({
                    showClose: true,
                    message: '登录成功，跳转页面',
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
        } else {
            ElMessage.error('请检查登录表单')
        }
    })
}

// 注册处理
const handleRegister = () => {
    registerFormRef.value?.validate(async (valid) => {
        if (valid) {
            const res: any = await registerApi(registerForm)
            console.log(res, '....')
            ElMessage({
                showClose: true,
                message: '注册成功，请登录',
                type: 'success'
            })
            activeTab.value = 'login'
        } else {
            ElMessage.error('请检查注册表单')
        }
    })
}
</script>

<style scoped>
.auth-container {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
}

.tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}
</style>

<!-- <script lang="ts" setup>
import { reactive, ref } from "vue";
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
<style lang="less"></style> -->
