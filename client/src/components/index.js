// 通用组件全局化注册

// 导入通用组件
import LiftNav from '@/components/LiftNav/index.vue'
import GoodsSlider from '@/components/GoodsSlider/index.vue'

export const componentPlugin = {
  install(app) {
    app.component('LiftNav', LiftNav)
    app.component('GoodsSlider', GoodsSlider)
  }
}
