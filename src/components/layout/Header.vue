<template lang="">
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
</style>
