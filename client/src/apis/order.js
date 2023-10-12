// 用户订单请求接口文件

import request from '@/utils/request' // 导入请求配置文件

// 获取全部用户订单
export const orderGetOrderApi = () => {
  return request.get('/order/getAllOrder')
}

// 根据订单ID获取订单
export const orderGetByIDApi = (oid) => {
  return request.get('/order/getOrderById', {
    params: {
      oid: oid
    }
  })
}

// 创建用户订单
export const orderAddOrderApi = (obj) => {
  return request.post('/order/addOrder', {
    total_num: obj.total_num,
    total_price: obj.total_price,
    area: obj.area,
    address: obj.address,
    consignee: obj.consignee,
    phone: obj.phone,
    pay_method: obj.pay_method,
    creat_date: obj.creat_date,
    goods_list: obj.goods_list
  })
}

// 删除用户订单
export const orderDelOrderApi = (oid) => {
  return request.post('/order/delOrder', {
    oid: oid
  })
}
