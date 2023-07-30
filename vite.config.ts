import { defineConfig } from 'vite'
import postcssPresetEnv from 'postcss-preset-env'
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
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          // stage: 0,
          autoprefixer: {
            grid: true,
          }
        })
    ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        math: "always",
        globalVars:{
          blue:"#1CC0FF"
        }
      }
    },
  }
})
