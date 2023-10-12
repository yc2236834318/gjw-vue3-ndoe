// 购物车仓库文件

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// 导入请求接口文件
import {
  cartGetGoodsByIdApi,
  cartAddGoodsCartApi,
  cartUpdateNumApi,
  cartDeleteGoodsApi
} from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([]) // 购物车列表

    // 获取购物车模块
    const getCartList = async () => {
      const res = await cartGetGoodsByIdApi()
      cartList.value = res.data.data
      // 将每个商品项挂载选择属性
      cartList.value.forEach((item) => (item.isChecked = true))
    }

    // 商品计算模块
    // 计算商品总数量
    const totalNum = computed(() =>
      cartList.value.reduce((total, item) => total + item.goods_num, 0)
    )
    // 计算选中商品总数量
    const totalCheckNum = computed(() =>
      cartList.value.reduce((total, item) => {
        if (item.isChecked) return total + item.goods_num
        return total
      }, 0)
    )
    // 计算选中商品总价格
    const totalCheckPrice = computed(() =>
      cartList.value.reduce((total, item) => {
        if (item.isChecked) return total + item.price * item.goods_num
        return total
      }, 0)
    )

    // 添加商品至购物车模块
    const addCart = async (obj) => {
      await cartAddGoodsCartApi(obj)
    }

    // 商品选择状态
    const allChecked = computed({
      // 复选框控制全选框
      get: () => cartList.value.every((item) => item.isChecked),
      // 全选框控制复选框
      set: (value) => {
        cartList.value.forEach((item) => {
          item.isChecked = value
        })
      }
    })

    // 修改商品数量模块
    const updateNum = async (obj) => {
      await cartUpdateNumApi(obj)
    }

    // 删除商品模块
    const deleteGoods = async (cid) => {
      await cartDeleteGoodsApi(cid)
    }

    // 结算提交信息模块
    const cartSubmit = ref({
      list: [],
      totalNum: 0,
      totalPrice: 0
    })
    const getCartSubmit = () => {
      cartSubmit.value.list = cartList.value.filter((item) => item.isChecked)
      cartSubmit.value.totalNum = cartSubmit.value.list.reduce(
        (total, item) => {
          return total + item.goods_num
        },
        0
      )
      cartSubmit.value.totalPrice = cartSubmit.value.list.reduce(
        (total, item) => {
          return total + item.goods_num * item.price
        },
        0
      )
    }

    // 清除购物车信息模块
    const clearCart = () => {
      cartList.value = []
      cartSubmit.value = { list: [], totalNum: 0, totalPrice: 0 }
    }

    // 导出仓库对象
    return {
      cartList,
      totalNum,
      totalCheckNum,
      totalCheckPrice,
      allChecked,
      getCartList,
      addCart,
      updateNum,
      deleteGoods,
      cartSubmit,
      getCartSubmit,
      clearCart
    }
  },
  {
    persist: {
      key: 'gjwCart' // 开启持久化
    }
  }
)
