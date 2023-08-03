<template lang="">
  <div>
    <el-button id="authBtn">登陆</el-button>
  </div>
</template>
<script>
export default {
  name: 'weixin-h5',
  mounted: () => {
    window.onload = function () {
      // 假设需要获取用户信息授权的按钮 id 为 'authBtn'
      document.getElementById('authBtn').addEventListener('click', function () {
        wx.ready(function () {
          // 在这里进行用户授权的逻辑
          wx.getUserInfo({
            success: function (res) {
              // 用户同意授权，可以在这里处理授权后的逻辑
              console.log('用户授权成功', res)
            },
            fail: function (res) {
              // 用户拒绝授权，可以在这里处理拒绝授权后的逻辑
              console.log('用户拒绝授权', res)
            }
          })
        })
        wx.error(function (res) {
          console.log('授权发生错误', res)
        })

      })
    }
  }
}
</script>
<style lang="">
  
</style>