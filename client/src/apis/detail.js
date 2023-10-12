// 商品详情请求接口文件

import request from '@/utils/request' // 导入请求配置文件

// 根据ID获取商品详情
export const detailGetGoodsApi = (id) => {
  return request.get(`/goods/getGoodsByID/${id}`)
}
