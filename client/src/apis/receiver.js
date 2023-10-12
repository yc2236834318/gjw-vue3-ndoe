// 用户收货信息相关请求接口文件

import request from '@/utils/request' // 导入请求配置文件

// 获取用户收货信息
export const receGetReceApi = () => {
  return request.get('/receiver/getReceiver')
}

// 添加用户收货信息
export const receAddReceApi = (obj) => {
  return request.post('/receiver/addReceiver', {
    area: obj.area[0] + obj.area[1] + obj.area[2],
    address: obj.address,
    phone: obj.phone,
    consignee: obj.consignee
  })
}

// 修改用户收货信息
export const receUpdateReceApi = (obj) => {
  return request.post('/receiver/updateReceiver', {
    id: obj.id,
    area: obj.area,
    address: obj.address,
    phone: obj.phone,
    consignee: obj.consignee
  })
}

// 删除用户收货信息
export const receDelReceApi = (id) => {
  return request.post('/receiver/delReceiver', {
    id
  })
}
