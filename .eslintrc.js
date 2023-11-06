module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    // plugins: ['prettier'],
    // eslint 与vue 结合
    extends: [
        // 'plugin:vue/vue3-essential',
        // '@vue/prettier',
        // '@vue/prettier/@typescript-eslint',
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',

    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: "module",
        ecmaFeatures: {
            "jsx": true
        }
    },
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'vue/no-unused-vars': 'error',
        'vue/multi-word-component-names': 'off'
    }
}
