<!-- 购物车列表 子组件 -->

<script setup>
import { myAlert } from '@/composables/myAlert'
import { useRouter } from 'vue-router' // 导入路由模块
import { useCartStore, useUserStore } from '@/stores' // 导入仓库文件
import { ref, onMounted, watchEffect } from 'vue'

const userStore = useUserStore() // 注册用户仓库
const cartStore = useCartStore() // 注册购物车仓库
const router = useRouter() // 注册路由实例
const loading = ref(false) // 加载状态
const cartList = ref([]) // 购物车列表

// 获取购物车数据
if (userStore.token) {
  watchEffect(() => {
    cartList.value = cartStore.cartList
  })
  onMounted(() => {
    loading.value = true
    cartStore.getCartList()
    loading.value = false
  })
}

// 商品数量修改
const changeNum = async (row, value) => {
  const obj = ref({
    cid: row.id,
    num: row.goods_num + value
  })
  if (obj.value.num < 1) return // 数量最低为1
  loading.value = true
  await cartStore.updateNum(obj.value) // 发起修改请求
  row.goods_num += value // 同步本地数量
  loading.value = false
}

// 商品删除
const delGoods = (cid) => {
  ElMessageBox.confirm('确定删除商品？', '温馨提示', {
    type: 'Warning',
    showClose: false,
    lockScroll: false,
    closeOnClickModal: false,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      loading.value = true
      await cartStore.deleteGoods(cid) // 发起删除请求
      cartStore.getCartList() // 重新获取数据
      myAlert('删除成功')
      loading.value = false
    })
    .catch(() => {})
}

// 商品结算
const settlement = () => {
  cartStore.getCartSubmit() // 获取选中商品的信息
  if (cartStore.cartSubmit.list.length < 1) return myAlert('请选择商品')
  router.push('/checkout')
}
</script>

<template>
  <div class="cart-list">
    <!-- 顶部全选框 -->
    <el-checkbox
      v-model="cartStore.allChecked"
      v-if="cartList.length > 0"
      class="allTop"
    ></el-checkbox>

    <!-- el-table 表格组件 -->
    <!--  - :data="数组名" 表格数据 -->
    <!--  - v-loading='数据名' 加载动画 -->
    <!-- el-table-column 表格列 -->
    <!--  - label="标题" 列标题 -->
    <!--  - prop="数据名" 列数据 -->
    <el-table :data="cartList" v-loading="loading" style="width: 100%">
      <el-table-column label="全选" width="100px" align="center">
        <!-- 自定义列(具名插槽) -->
        <template #default="{ row }">
          <el-checkbox v-model="row.isChecked"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="商品" width="450px" prop="goodsname">
        <!-- 自定义列(具名插槽) -->
        <template #default="{ row }">
          <div class="goodsItem">
            <RouterLink
              :to="'/detail/' + row.goods_id"
              target="_blank"
              class="img-box"
            >
              <img v-img-lazy="row.goods_img" alt="" />
            </RouterLink>
            <div class="goods-info">
              <RouterLink
                :to="'/detail/' + row.goods_id"
                target="_blank"
                class="goods-name"
                >{{ row.goodsname }}</RouterLink
              >
              <div class="goods-type">
                <span class="goods-color">{{ row.goods_color }}</span>
                <span class="goods-edition">{{ row.goods_edition }}</span>
                <p v-if="row.activity" class="activity">{{ row.activity }}</p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template #default="{ row }">&yen; {{ row.price }}</template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template #default="{ row }">
          <span class="numBtn" @click="changeNum(row, -1)">-</span>
          <span class="goodsNum">{{ row.goods_num }}</span>
          <span class="numBtn" @click="changeNum(row, 1)">+</span>
        </template>
      </el-table-column>
      <el-table-column label="小计" align="center">
        <template #default="{ row }">
          &yen; {{ row.price * row.goods_num }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <!-- 自定义列(具名插槽) -->
        <template #default="{ row }">
          <el-button type="danger" @click="delGoods(row.id)">移除</el-button>
        </template>
      </el-table-column>
      <!-- 空组件(具名插槽) -->
      <template #empty>
        <el-empty description="购物车是空的，去添加商品吧！"></el-empty>
      </template>
    </el-table>

    <!-- 底部合计模块 -->
    <div class="cart-total" v-if="cartList.length > 0">
      <!-- 底部全选框 -->
      <div class="allbox">
        <el-checkbox v-model="cartStore.allChecked" class="allBt"></el-checkbox>
        <span>全选</span>
      </div>
      <div class="settle" @click="settlement">立即结算</div>
      <div class="cart-price">
        已选择 <i>{{ cartStore.totalCheckNum }}</i> 件商品 总计:
        <span
          >&yen; <em>{{ cartStore.totalCheckPrice.toFixed(2) }}</em></span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-list {
  .goodsItem {
    display: flex;
    height: 90px;
    margin-top: 10px;
    padding-left: 40px;
    text-align: center;
    background: #fff;
    .img-box {
      display: flex;
      align-items: center;
      width: 80px;
      height: 80px;
      margin-right: 30px;
      img {
        width: 70px;
        max-width: none;
        max-height: none;
        background-color: transparent;
        cursor: pointer;
      }
    }
    .goods-info {
      width: 385px;
      height: 80px;
      text-align: left;
      .goods-name {
        color: #3a3a3a;
        font-size: 18px;
        font-weight: bold;
        line-height: 20px;
        margin-bottom: 10px;
      }
      .goods-type {
        margin-top: 10px;
        font-size: 12px;
        span {
          margin-right: 10px;
          padding: 0 5px;
          color: #fa2a2d;
          line-height: 14px;
          border: 1px solid #fa2a2d;
        }
        .activity {
          width: 85px;
          margin-top: 5px;
          padding: 0 5px;
          color: #fff;
          line-height: 16px;
          background: #fa2a2d;
        }
      }
    }
  }
  // 全选框
  .allbox {
    span {
      position: absolute;
      top: 18px;
      left: 58px;
      color: #a4a4a4;
      font-weight: bold;
    }
  }
  .allTop {
    position: absolute;
    top: 58px;
    left: 30px;
    z-index: 10;
  }
  .allBt {
    position: absolute;
    top: 12px;
    left: 30px;
  }
  // 选择框样式
  :deep(.el-checkbox__inner) {
    width: 20px;
    height: 20px;
    border: 2px solid #a4a4a4;
  }
  :deep(.el-checkbox__inner)::after {
    top: 3px;
    left: 6px;
    border-width: 2px;
  }
  .goodsNum {
    display: inline-block;
    width: 50px;
    height: 30px;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    vertical-align: middle;
  }
  .numBtn {
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    border: 2px solid #a4a4a4;
    vertical-align: middle;
    cursor: pointer;
  }
  .cart-total {
    position: relative;
    height: 60px;
    background: #fff;
    .cart-price {
      float: right;
      font-size: 16px;
      line-height: 60px;
      margin-right: 20px;
      i {
        color: crimson;
      }
      span {
        color: crimson;
        font-size: 20px;
        vertical-align: top;
        em {
          font-style: normal;
        }
      }
    }
    .settle {
      float: right;
      width: 200px;
      height: 60px;
      color: #fff;
      font-size: 18px;
      line-height: 60px;
      background: #fa2a2d;
      text-align: center;
      cursor: pointer;
    }
  }
}
// 表格区域
.cart-list {
  // th样式
  :deep(.el-table__header-wrapper th) {
    height: 60px;
    color: #a4a4a4;
  }
  // tr样式
  :deep(.el-table .el-table__body tr) {
    height: 120px;
  }
  // td样式
  :deep(.el-table .el-table__body td) {
    font-size: 16px;
  }
  // 去掉表格底部线条
  :deep(.el-table__inner-wrapper)::before {
    background-color: transparent;
  }
  // th下方间隔
  :deep(.el-table th.el-table__cell) {
    border-bottom: 10px solid #f6f6f6;
  }
  // td下方间隔
  :deep(.el-table td.el-table__cell) {
    border-bottom: 10px solid #f6f6f6;
  }
  // 第五列(td)
  :deep(.el-table td:nth-of-type(5).el-table__cell) {
    color: crimson;
    font-weight: bold;
  }
  // 第1列(th)
  :deep(.el-table th:nth-of-type(1).el-table__cell) {
    padding-left: 40px;
  }
  // 第二列(th)
  :deep(.el-table th:nth-of-type(2).el-table__cell) {
    padding-left: 40px;
  }
  // 鼠标移入tr时td的样式
  :deep(.el-table--enable-row-hover .el-table__body tr):hover > td {
    background-color: transparent;
  }
}
</style>
