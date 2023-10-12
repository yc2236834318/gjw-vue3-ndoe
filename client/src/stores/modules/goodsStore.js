// 商品仓库文件

import { ref } from 'vue'
import { defineStore } from 'pinia'
// 导入请求接口文件
import {
  goodsGetHdApi,
  goodsGetCoverApi,
  goodsGetBrandGoodsApi,
  goodsGetTypeGoodsApi,
  goodsGetHotGoodsApi,
  goodsFilterGoodsApi,
  goodsSearchGoodsApi
} from '@/apis/goods'

export const useGoodsStore = defineStore('goods', () => {
  // 横幅模块
  const goodsHd = ref([])
  const getGoodsHd = async () => {
    const res = await goodsGetHdApi()
    goodsHd.value = res.data.data[0].banner_img
  }

  // 品牌封面模块
  const brandCover = ref([])
  const getBrandCover = async () => {
    const res = await goodsGetCoverApi()
    brandCover.value = res.data.data
  }

  // 商品按品牌分类模块
  const goodsList = ref([]) // 商品列表
  const reGoodsList = ref([]) // 重复商品列表
  const getAllGoods = async () => {
    const res = await goodsGetBrandGoodsApi()
    goodsList.value = res.data.data
    // 数据不够,重复添加一下
    reGoodsList.value = [...goodsList.value]
    reGoodsList.value.push(...goodsList.value)
    reGoodsList.value.push(...goodsList.value.slice(0, 2))
  }

  // 商品按类型分类模块
  const typeList = ref([])
  const getGoodsByType = async () => {
    const res = await goodsGetTypeGoodsApi()
    typeList.value = res.data.data
  }

  // 热销商品模块
  const hotGoodsList = ref([])
  const getHotGoodsList = async () => {
    const res = await goodsGetHotGoodsApi()
    hotGoodsList.value = res.data.data
  }

  // 商品筛选模块
  const filterGoodsList = ref([]) // 商品列表
  const goodsTotal = ref(0) // 商品总数
  const getfilterGoodsList = async (obj) => {
    const res = await goodsFilterGoodsApi(obj)
    goodsTotal.value = res.data.count
    filterGoodsList.value = res.data.data
  }

  // 商品搜索模块
  const searchGoodsList = ref([])
  const searchGoods = async (key) => {
    const res = await goodsSearchGoodsApi(key)
    searchGoodsList.value = res.data.data
  }

  // 导出仓库对象
  return {
    goodsHd,
    getGoodsHd,
    brandCover,
    getBrandCover,
    goodsList,
    reGoodsList,
    getAllGoods,
    typeList,
    getGoodsByType,
    hotGoodsList,
    getHotGoodsList,
    filterGoodsList,
    goodsTotal,
    getfilterGoodsList,
    searchGoodsList,
    searchGoods
  }
})
