<template>
    <div>
        <el-button type="primary" @click="openDialog">打开子组件 Dialog</el-button>
        <child-component
            :dialog-visible="dialogVisible"
            @close="dialogVisible = false"
        ></child-component>
    </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import ChildComponent from './ChildComponent.vue'

defineComponent({
    name: 'ParentComponent',
    inheritAttrs: false
})

const dialogVisible = ref(false)

const openDialog = () => {
    console.log('kkkkkk')
    dialogVisible.value = true
}
</script>

<style>
/* 可以添加一些自定义样式 */
</style>
