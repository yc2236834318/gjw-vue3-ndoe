// 入口文件

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'
import '@/styles/common.scss'
import { lazyPlugin } from '@/directives' // 导入自定义指令文件
import { componentPlugin } from '@/components' // 导入通用组件插件

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
