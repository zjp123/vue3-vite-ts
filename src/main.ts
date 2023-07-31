import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { ElButton } from 'element-plus'
// import 'element-plus/dist/index.css'

// import './public-path';
const app = createApp(App)
app.use(router)
app.mount('#app')
