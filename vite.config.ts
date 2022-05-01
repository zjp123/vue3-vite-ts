import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import {name} from './package'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 7002
  }
})
