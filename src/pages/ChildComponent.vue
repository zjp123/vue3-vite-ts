<template>
    <!-- <div>hhhhhh</div> -->
    <el-dialog v-model="internalVisible" title="子组件 Dialog" @close="handleClose">
        <p>这是子组件中的内容。</p>
        <template #footer>
            <el-button @click="handleClose">关闭</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { ref, watch } from 'vue'

export default {
    name: 'ChildComponent',
    props: {
        dialogVisible: Boolean // 重命名 prop 避免重复
    },
    emits: ['close'], // 声明 close 事件以通知父组件关闭对话框

    setup(props, { emit }) {
        const internalVisible = ref(false)

        // 监听 dialogVisible 的变化
        watch(
            () => props.dialogVisible,
            (newValue) => {
                console.log(props.dialogVisible, 'props.dialogVisible')
                internalVisible.value = newValue
            }
        )

        const handleClose = () => {
            emit('close') // 向父组件发送 close 事件
            internalVisible.value = false // 关闭对话框
        }

        return {
            internalVisible,
            handleClose
        }
    }
}
</script>

<style scoped>
.dialog-footer {
    text-align: right;
}
</style>
