import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { ElButton } from 'element-plus'
// import './public-path';
import './testa'
// process = '99'
const app = createApp(App)
app.config.globalProperties.$globalVar = '我是全局变量'
app.use(router)
app.mount('#app')
