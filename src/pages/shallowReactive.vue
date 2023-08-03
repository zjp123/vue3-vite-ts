<template lang="">
  <div>
    <div>哈哈哈{{state.foo}}</div>
    <div>是是是{{state.nested.bar}}</div>
    <el-button type="primary" @click="clickFn">测试shallowReactive</el-button>
  </div>
</template>
<script lang="ts">
// 普通 <script>, 在模块作用域下执行 (仅一次)
// runSideEffectOnce()

// 声明额外的选项
export default {
  created: () => {
    console.log('createdcreated')
  },
  mounted: () => {
    console.log('mountedmounted', this)
  }
}
</script>
<script lang="ts" setup>
import { shallowReactive } from "vue"
const obj = {
  foo: 1,
  nested: {
    bar: 2
  }
}
const state = shallowReactive(obj)
state.foo = 666

const clickFn = () => {
  state.nested.bar = 99
  console.log(obj) // 虽然bar 不是响应式  但是obj的值会变化
}
</script>
<style lang="">

</style>
