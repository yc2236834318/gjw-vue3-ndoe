// 焦点模块仓库文件

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { focusGetSwiperApi, focusGetRecomApi } from '@/apis/focus' // 导入请求接口文件

export const useFocusStore = defineStore('focus', () => {
  // 轮播图模块
  const swiperList = ref([]) // 轮播图列表
  const getSwiperList = async () => {
    const res = await focusGetSwiperApi()
    swiperList.value = res.data.data
  }

  // 推荐模块
  const recomList = ref([]) // 推荐列表
  const getRecomList = async () => {
    const res = await focusGetRecomApi()
    recomList.value = res.data.data
  }

  // 导出仓库对象
  return {
    swiperList,
    getSwiperList,
    recomList,
    getRecomList
  }
})
