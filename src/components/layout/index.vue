<template>
    <div id="container">
        <Aside class="aside-style" />
        <div style="display: flex; flex-direction: column; width: 100%">
            <Header />
            <!-- <RouterView /> -->
            <RouterView>
                <template #default="{ Component, route }">
                    <component :is="Component" :key="route.fullPath" style="padding: 20px" />
                </template>
            </RouterView>
        </div>
    </div>
    <!-- </el-row> -->
</template>

<script lang="ts" setup>
// import { useRoute, useRouter } from 'vue-router'
// import { useUserStore } from '@/store/modules/user'
import Header from './Header.vue'
import Aside from './aside.vue'
// const userStore = useUserStore()

// const getUserInfoFn = async () => {
//     await userStore.afterLoginAction()
// }

// getUserInfoFn()
// const isShowAiside = ref(false)
// const router = useRouter()
// onMounted(() => {
//     router.afterEach(() => {
//         const currentRoute = useRoute()
//         console.log('当前路由信息:', currentRoute)
//         if (currentRoute.path === '/login' || currentRoute.name === 'PageNotFound') {
//             // 在/login 路由下的逻辑
//             console.log('在/login 路由下')
//             isShowAiside.value = false
//         } else {
//             isShowAiside.value = true
//         }
//     })
// })
</script>
<style lang="less">
#container {
    display: flex;
    flex: 1;
    height: 100vh;
    .aside-style {
        .el-menu-vertical-demo {
            height: 100%;
        }
    }
}
</style>
