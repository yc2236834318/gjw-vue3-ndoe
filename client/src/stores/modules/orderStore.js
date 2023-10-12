// 用户订单仓库文件

import { ref } from 'vue'
import { defineStore } from 'pinia'
// 导入请求接口文件
import {
  orderGetOrderApi,
  orderGetByIDApi,
  orderAddOrderApi,
  orderDelOrderApi
} from '@/apis/order'

export const useOrderStore = defineStore(
  'order',
  () => {
    const orderList = ref([]) // 用户订单列表

    // 获取用户全部订单
    const getOrderList = async () => {
      const res = await orderGetOrderApi()
      orderList.value = res.data.data
    }

    // 根据订单ID获取订单
    const getOrderById = async (oid) => {
      try {
        const res = await orderGetByIDApi(oid)
        return res.data // 返回响应数据
      } catch (error) {
        console.error(error)
        throw error // 抛出错误以便后续处理
      }
    }

    // 添加用户订单
    const addOrder = async (orderData) => {
      try {
        const res = await orderAddOrderApi(orderData)
        return res.data // 返回响应数据
      } catch (error) {
        console.error(error)
        throw error // 抛出错误以便后续处理
      }
    }

    // 删除用户订单
    const deleteOrder = async (id) => {
      await orderDelOrderApi(id)
    }

    // 清除用户订单
    const clearOrder = () => {
      orderList.value = []
    }

    // 导出仓库对象
    return {
      orderList,
      getOrderList,
      getOrderById,
      addOrder,
      deleteOrder,
      clearOrder
    }
  },
  {
    persist: {
      key: 'gjwOrder' // 开启持久化
    }
  }
)
