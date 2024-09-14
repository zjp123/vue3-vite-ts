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
    envDir: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router', 'vuex'],
            // 增加 eslintrc，自动生成 .eslintrc-auto-import.json 文件
            eslintrc: {
                enabled: true
            }
            // eslintrc: {
            //     enabled: false, // Default `false`
            //     // filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            //     globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            // }
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
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
