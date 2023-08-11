import { defineConfig } from 'vite'
import postcssPresetEnv from 'postcss-preset-env'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as path from 'path'

// import {name} from './package'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    resolve: {
        alias: {
            // 添加别名，将 'aaa' 映射到实际的绝对路径
            aaa: path.resolve(__dirname, 'node_modules/aaa/index.js'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        port: 7002
    },
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv({
                    // stage: 0,
                    autoprefixer: {
                        grid: true
                    }
                })
            ]
        },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                math: 'always',
                globalVars: {
                    blue: '#1CC0FF'
                }
            }
        }
    }
})
