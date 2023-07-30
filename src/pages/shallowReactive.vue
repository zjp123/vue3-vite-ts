<template lang="">
  <div>
    哈哈哈{{state.foo}}
  </div>
</template>
<script setup>
import { shallowReactive } from "vue"
// const obj = {
//   foo: 1,
//   nested: {
//     bar: 2
//   }
// }
let state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})
state.foo = 666
</script>
<style lang="">
  
</style>