import { createApp } from 'vue'
import App from './App.vue'
import { routerHistory } from './router/index'
// import router from './router'
import axios from 'axios'
import cookies from 'vue-cookies'
import VueAxios from 'vue-axios'
import '@/router/permission'
import { store } from './store'
// import { ElButton } from 'element-plus'
// import './public-path';

const app = createApp(App)
app.use(store)
app.use(routerHistory)
app.use(VueAxios, axios)
app.use(cookies)

app.mount('#app')
