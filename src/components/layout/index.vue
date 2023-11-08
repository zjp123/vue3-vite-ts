<template>
    <el-row>
        <Header />
    </el-row>
</template>

<script lang="ts" setup>
import Header from './Header.vue'
</script>
<style scoped lang="less">
#headerBox {
    height: 0.4rem;
    line-height: 0.44rem;
    background-color: rgba(28, 149, 77, 0.861);
    color: @blue;
    user-select: none;
    font-size: 0.18rem;
}
</style>
