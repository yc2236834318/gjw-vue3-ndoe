// 支付请求接口文件

import request from '@/utils/request' // 导入请求配置文件

// 支付
export const payOrderApi = (oid) => {
  return request.post('/order/payOrder', {
    oid: oid
  })
}
