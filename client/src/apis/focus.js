// 焦点模块相关请求接口文件

import request from '@/utils/request' // 导入请求配置文件

// 获取轮播图列表
export const focusGetSwiperApi = () => {
  return request.get('/goods/getBanner/1')
}

// 获取推荐列表
export const focusGetRecomApi = () => {
  return request.get('/goods/getBanner/2')
}
