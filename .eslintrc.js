module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    // plugins: ['prettier'],
    extends: [
        // 'plugin:vue/vue3-essential',
        // '@vue/typescript/recommended',
        // '@vue/prettier',
        // '@vue/prettier/@typescript-eslint',
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
}
