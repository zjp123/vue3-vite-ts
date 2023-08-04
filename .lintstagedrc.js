module.exports = {
    '**/*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
    '*.{json,md,yml,css,ts}': ['prettier --write']
}
