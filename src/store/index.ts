// import { createPinia } from 'pinia'

// const store = createPinia()

// export default store

import { createPinia } from 'pinia'

const store = createPinia()

export * from './modules/permission'
export * from './modules/user'
export { store }
