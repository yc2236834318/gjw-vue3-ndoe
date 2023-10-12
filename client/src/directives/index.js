// 自定义指令文件

import { useIntersectionObserver } from '@vueuse/core' // 导入usevue库

// 图片懒加载
export const lazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // 判断是否进入视口区域
          if (isIntersecting) {
            el.src = binding.value
            stop() // 停止监听
          }
        })
      }
    })
  }
}
