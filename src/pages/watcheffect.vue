<template lang="">
    <div>
        <div ref="haha">哈哈哈{{ count }}</div>
        <el-button type="primary" @click="clickFn">测试watchEffect</el-button>
    </div>
</template>
<script lang="ts">
import { watchEffect, ref } from 'vue'
export default defineComponent({
    name: 'WatchEffect',
    setup() {
        ElMessage({
            showClose: true,
            message: '登录成功66',
            type: 'success'
        })
        const count = ref(0)
        watchEffect((onCleanup) => {
            console.log(count.value, 'count')
            onCleanup(() => {
                //
            })
        })
        const clickFn = () => {
            count.value++
        }
        // 返回值会暴露给模板和其他的选项式 API 钩子
        return {
            count,
            clickFn
        }
    },

    mounted() {
        console.log(this.count) // 0
        console.log(this.$refs.haha) // 0
    },
    methods: {
        // clickFn () {
        //   this.count++
        // }
    }
})
</script>
<style lang=""></style>
