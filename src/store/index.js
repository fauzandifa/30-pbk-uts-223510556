// src/store/index.js

import { createPinia } from 'pinia'
import { boot } from 'quasar/wrappers'

const pinia = createPinia()

export default pinia

export const install = boot(({ app }) => {
  app.use(pinia)
})
