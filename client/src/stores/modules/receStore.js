// 用户收货仓库文件

import { ref } from 'vue'
import { defineStore } from 'pinia'
// 导入请求接口文件
import {
  receGetReceApi,
  receAddReceApi,
  receUpdateReceApi,
  receDelReceApi
} from '@/apis/receiver'

export const useReceStore = defineStore(
  'receiver',
  () => {
    const receList = ref([]) // 用户收货信息列表

    // 获取用户收货信息
    const getReceList = async () => {
      const res = await receGetReceApi()
      receList.value = res.data.data
    }

    // 添加用户收货信息
    const addRece = async (obj) => {
      await receAddReceApi(obj)
    }

    // 修改用户收货信息
    const updateRece = async (obj) => {
      await receUpdateReceApi(obj)
    }

    // 删除用户收货信息
    const deleteRece = async (id) => {
      await receDelReceApi(id)
    }

    // 清除用户收货信息
    const clearRece = () => {
      receList.value = []
    }

    // 导出仓库对象
    return {
      receList,
      getReceList,
      addRece,
      updateRece,
      deleteRece,
      clearRece
    }
  },
  {
    persist: {
      key: 'gjwReceiver' // 开启持久化
    }
  }
)
