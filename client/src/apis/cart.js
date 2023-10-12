// 购物车相关请求接口文件

import request from '@/utils/request' // 导入请求配置文件

// 根据用户ID获取购物车数据
export const cartGetGoodsByIdApi = () => {
  return request.get('/cart/getCart')
}

// 根据商品ID添加至购物车
export const cartAddGoodsCartApi = (obj) => {
  return request.post('/cart/addCart', {
    gid: obj.gid,
    num: obj.num,
    edition: obj.edition,
    color: obj.color
  })
}

// 修改商品数量
export const cartUpdateNumApi = (obj) => {
  return request.post('/cart/updateNum', {
    cid: obj.cid,
    num: obj.num
  })
}

// 删除商品
export const cartDeleteGoodsApi = (cid) => {
  return request.post('/cart/deleteCart', {
    cid: cid
  })
}
