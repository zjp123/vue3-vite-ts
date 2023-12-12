# 这是一个 vue3 + ts + vite 项目

# 同时作为 一个微前端的子项目 app2 localhost:

# 步骤：

# npm create vite@latest 按照步骤一步一步来，node 版本 10+

# vue3 目前只能用于学习 vue3 不能用于微应用，微应用只能用于 vue2

# node 版本切换为 16+ vite 版本 3+

```js
vue3 配置eslint vite typescript
1、yarn add --dev eslint eslint-plugin-vue
进入eslint-plugin-vue这个插件官网，查看配置指引
extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // 使用 Vue 3 推荐的 ESLint 规则
],
parserOptions: {
    parser: 'babel-eslint',
},

2、yarn add --dev @vitejs/plugin-vue @vitejs/plugin-vue-jsx
这一步在通过vite 创建的项目时，就自动帮你安装

3、yarn add --dev eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    // 在这里添加你的自定义规则
  },
};
同时，在 tsconfig.json 文件中，确认已经启用了 compilerOptions 中的 "target": "esnext" 和 "jsx": "preserve" 选项。

4、接着在配置pretty husky lint-staged --这些配完才算配置基本完成

5、env.d.ts 转给环境变量定义ts类型 auto-imports.d.ts  components.d.ts插件自动生成

6、extendProperties.d.ts 给vue 运行时扩展自定义属性用的

按需导入后引用ElMessage组件报错或者样式丢失
7、https://blog.csdn.net/qq_39111074/article/details/132907645?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-132907645-blog-134049912.235%5Ev38%5Epc_relevant_anti_vip&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-132907645-blog-134049912.235%5Ev38%5Epc_relevant_anti_vip&utm_relevant_index=5

```

8、主题改变原理---自定义css变量
