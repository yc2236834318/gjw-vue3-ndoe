// 商品筛选函数

import { useGoodsStore } from '@/stores' // 导入仓库文件
import { ref } from 'vue'

const goodsStore = useGoodsStore() // 注册商品仓库

export function useFilter() {
  // 筛选参数
  const queryObj = ref({
    brand: '%', // 商品品牌 %表示所有品牌
    type: '%', // 商品类型 %表示所有类型
    min: 0, // 商品最低价
    max: 99999, // 商品最高价
    page: 1, // 当前页码
    per_page: 15, // 每页显示的条数
    order: 'desc' // 排序方式
  })

  const total = ref(0) // 商品总条数
  const goodsList = ref([]) // 商品列表
  const loading = ref(false) // 加载效果
  // 商品获取函数
  const getGoodsList = async () => {
    loading.value = true
    window.scrollTo({ top: 0 }) // 滚动到页面顶部
    await goodsStore.getfilterGoodsList(queryObj.value) // 获取品牌商品数据
    goodsList.value = goodsStore.filterGoodsList
    total.value = goodsStore.goodsTotal
    loading.value = false
  }

  return {
    total,
    queryObj,
    loading,
    getGoodsList
  }
}
