import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ShallowReactiveCom from './pages/shallowReactive.vue'

const routes = [
  {
    path: '/shallowReactive',
    name: 'shallowReactive',
    component: ShallowReactiveCom,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;