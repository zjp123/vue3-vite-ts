<template>
    <el-row>
        <Header />
        <!-- <RouterView /> -->
        <RouterView>
            <template #default="{ Component, route }">
                <component :is="Component" :key="route.fullPath" />
            </template>
        </RouterView>
    </el-row>
</template>

<script lang="ts" setup>
import Header from './Header.vue'
</script>
<style scoped lang="less"></style>
