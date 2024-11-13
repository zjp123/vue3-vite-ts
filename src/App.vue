<script setup lang="ts">
// import Layout from '@/components/layout/index.vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
    <!-- <Layout> -->
    <RouterView />
    <!-- </Layout> -->
</template>

<style less>
body {
    margin: 0;
    padding: 0;
    * {
        margin: 0;
        padding: 0;
    }
    ul,
    li,
    ol {
        list-style: none;
    }
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* margin-top: 60px; */
}
</style>
