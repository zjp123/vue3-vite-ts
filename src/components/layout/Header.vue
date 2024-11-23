<!-- <template lang="">
    <header id="headerBox">这是网站头部</header>
</template>

<script>
export default {
    name: 'HeaderCom'
}
</script>
<style scoped lang="less">
#headerBox {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgba(28, 149, 77, 0.861);
    color: @blue;
    user-select: none;
    font-size: 18px;
}
</style> -->

<template>
    <el-page-header id="header-box" :icon="null">
        <template #title>{{ null }}</template>
        <template #content>
            <div class="logo-box">
                <el-avatar class="mr-3" :src="logo" />
                <!-- <img class="mr-3" style="width: 50px" src="../../images/xishilai.png" alt="logo" /> -->
            </div>
        </template>
        <template #extra>
            <div class="avatar-box">
                <!-- <el-button type="primary" class="ml-2">{{ userInfo.userName }}</el-button> -->
                <el-avatar> {{ userInfo.userName }} </el-avatar>
            </div>
        </template>
    </el-page-header>

    <!-- <el-menu
        :default-active="activeIndex"
        class="el-menu-demo header-box"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="0">
            <img style="width: 100px" src="../../images/xishilai.png" alt="logo" />
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">{{ userInfo.userName }}</el-menu-item>
        <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
    </el-menu> -->
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
// import { ref } from 'vue'
const userStore = useUserStore()
// const activeIndex = ref('1')
const userInfo = computed(() => userStore.userInfo)
// const handleSelect = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }
import logo from '../../images/xishilai.png'
</script>

<style lang="less">
.flex-grow {
    flex-grow: 1;
}
#header-box {
    padding: 10px 20px;
    border-bottom: 1px solid #ebeaef;
    .el-divider,
    .el-page-header__back {
        display: none;
    }
    .el-page-header__content,
    .logo-box,
    .el-page-header__extra,
    .avatar-box {
        display: flex;
        align-items: center;
    }
}
</style>
