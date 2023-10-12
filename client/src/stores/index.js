// pinia 配置文件

import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 仓库统一导出
export * from '@/stores/modules/userStore'
export * from '@/stores/modules/focusStore'
export * from '@/stores/modules/goodsStore'
export * from '@/stores/modules/cartStore'
export * from '@/stores/modules/receStore'
export * from '@/stores/modules/orderStore'
export * from '@/stores/modules/updateStore'
