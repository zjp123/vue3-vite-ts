import { defineConfig, loadEnv } from 'vite'
import postcssPresetEnv from 'postcss-preset-env'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as path from 'path'
import { wrapperEnv } from './src/utils/build'
const root = process.cwd()
const mode = process.env.NODE_ENV as string
const env = loadEnv(mode, root)
const viteEnv = wrapperEnv(env)
// console.log(viteEnv, 'viteEnvviteEnv')
const { VITE_DROP_CONSOLE } = viteEnv

// import {name} from './package'
// https://vitejs.dev/config/
export default defineConfig({
    envDir: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '#': path.resolve(__dirname, './types')
        }
        // alias: [
        // {
        //     '@': path.resolve(__dirname, './src'),
        // },
        //  {
        //     find: 'vue-i18n',
        //     replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        //   },
        // /@/xxxx => src/xxxx
        //   {
        //     find: /@/,
        //     // replacement: pathResolve('src') + '/',
        //     replacement: path.resolve(__dirname, './src'),
        //   },
        //   // /#/xxxx => types/xxxx
        //   {
        //     find: /\/#\//,
        //     replacement: path.resolve(__dirname, './types'),
        //   },
        // ]
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
    },
    esbuild: {
        // drop: process.env.NODE_ENV === 'production' ? ['console.log'] : []
        // pure: VITE_DROP_CONSOLE ? ['console.log'] : []
        pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
        target: 'es2020',
        cssTarget: 'chrome80',
        outDir: path.resolve(__dirname, './dist'),
        minify: 'esbuild',
        // terserOptions: {
        //   compress: {
        //     keep_infinity: true,
        //     // Used to delete console in production environment
        //     drop_console: VITE_DROP_CONSOLE,
        //   },
        // },
        // Turning off brotliSize display can slightly reduce packaging time
        reportCompressedSize: true,
        chunkSizeWarningLimit: 500
    },
    optimizeDeps: {
        // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
        include: [
            '@vue/runtime-core',
            '@vue/shared'
            //   '@iconify/iconify',
            //   'ant-design-vue/es/locale/zh_CN',
            //   'ant-design-vue/es/locale/en_US',
        ]
    }
})
