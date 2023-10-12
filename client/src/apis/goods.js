// 商品相关请求接口文件

import request from '@/utils/request' // 导入请求配置文件

// 获取横幅
export const goodsGetHdApi = () => {
  return request.get('/goods/getBanner/3')
}

// 获取品牌封面
export const goodsGetCoverApi = () => {
  return request.get('/goods/getBanner/4')
}

// 获取品牌商品(按品牌分组)
export const goodsGetBrandGoodsApi = () => {
  return request.get('/goods/getAllGoodsByBrand')
}

// 获取品牌商品(按类型分组)
export const goodsGetTypeGoodsApi = () => {
  return request.get('/goods/getAllGoodsByType')
}

// 获取热销商品
export const goodsGetHotGoodsApi = () => {
  return request.get('/goods/getHot')
}

// 商品筛选
export const goodsFilterGoodsApi = (obj) => {
  return request.post('/goods/filterGoods', {
    brand: obj.brand, // 商品品牌
    type: obj.type, // 商品类型
    order: obj.order, // 排序方式
    page: obj.page, // 查询页数
    per_page: obj.per_page, // 每页条数
    min: obj.min, // 价格最小值
    max: obj.max // 价格最大值
  })
}

// 商品搜索
export const goodsSearchGoodsApi = (key) => {
  return request.get(`/goods/searchGoods/${key}`)
}
