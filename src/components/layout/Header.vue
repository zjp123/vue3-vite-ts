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
    <el-menu
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
        <el-menu-item index="1">Processing Center</el-menu-item>
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
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style lang="less">
.header-box {
    width: 100%;
}
.flex-grow {
    flex-grow: 1;
}
</style>
