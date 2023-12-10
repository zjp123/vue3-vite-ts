<template>
    <div id="container">
        <Aside />
        <div style="display: flex; flex-direction: column; width: 100%">
            <Header />
            <!-- <RouterView /> -->
            <RouterView>
                <template #default="{ Component, route }">
                    <component :is="Component" :key="route.fullPath" />
                </template>
            </RouterView>
        </div>
    </div>
    <!-- </el-row> -->
</template>

<script lang="ts" setup>
import Header from './Header.vue'
import Aside from './aside.vue'
</script>
<style scoped lang="less">
#container {
    display: flex;
    flex: 1;
    height: 100vh;
    .el-menu-vertical-demo {
        height: 100%;
    }
}
</style>
