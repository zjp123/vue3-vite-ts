import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ShallowReactiveCom from './pages/shallowReactive.vue'
import WatcheffectCom from './pages/watcheffect.vue'

const routes = [
  {
    path: '/shallowReactive',
    name: 'shallowReactive',
    component: ShallowReactiveCom,
  },
  {
    path: '/watcheffect',
    name: 'watcheffect',
    component: WatcheffectCom,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;