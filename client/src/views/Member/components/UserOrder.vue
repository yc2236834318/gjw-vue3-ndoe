<!-- 用户订单页 三级路由 -->

<script setup>
import { useOrderStore } from '@/stores' // 导入仓库文件
import { myAlert } from '@/composables/myAlert'
import { ref, onMounted } from 'vue'

const orderStore = useOrderStore() // 注册订单仓库
const orderList = ref([]) // 订单列表
// 获取订单列表函数
const getOrderList = async () => {
  await orderStore.getOrderList()
  orderList.value = orderStore.orderList
}
onMounted(() => {
  getOrderList()
})
// 删除订单
const loading = ref(false)
const delOrder = (oid) => {
  ElMessageBox.confirm('确定删除订单？', '温馨提示', {
    type: 'Warning',
    showClose: false,
    lockScroll: false,
    closeOnClickModal: false,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      loading.value = true
      await orderStore.deleteOrder(oid) // 发起删除请求
      getOrderList() // 重新获取数据
      myAlert('删除成功')
      loading.value = false
    })
    .catch(() => {})
}
</script>

<template>
  <div class="order-container" v-loading="loading">
    <el-tabs>
      <!-- tab切换 -->
      <el-tab-pane label="全部订单" />
      <div class="main-container">
        <div class="holder-container" v-if="orderList.length < 1">
          <el-empty description="暂无订单数据" />
        </div>
        <div v-else>
          <!-- 订单列表 -->
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <div class="head">
              <span>下单时间：{{ order.creat_date.substring(0, 10) }}</span>
              <span>订单编号：{{ order.id }}</span>
              <span>收货地址：{{ order.area + order.address }}</span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li
                    v-for="item in JSON.parse(order.goods_list)"
                    :key="item.id"
                  >
                    <a class="image" href="javascript:;">
                      <img :src="`public/upload/${item.goods_img}`" alt="" />
                    </a>
                    <div class="info">
                      <p class="name">
                        {{ item.goodsname }}
                      </p>
                      <p class="edition">
                        <span>{{ item.goods_edition }}</span>
                      </p>
                      <p class="color">
                        <span>{{ item.goods_color }}</span>
                      </p>
                    </div>
                    <div class="price">&yen; {{ item.price?.toFixed(2) }}</div>
                    <div class="count">x {{ item.goods_num }}</div>
                  </li>
                </ul>
              </div>
              <div class="column amount">
                <p class="red">&yen;{{ order.total_price?.toFixed(2) }}</p>
                <p>( 含运费：&yen; 10 )</p>
              </div>
              <div class="column receiver">
                <p>支付状态：{{ order.pay_method }}</p>
                <p>收货人：{{ order.consignee }}</p>
                <p>联系方式：{{ order.phone }}</p>
              </div>
              <div class="column del">
                <a @click="delOrder(order.id)" href="javascript:;">删除订单</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;
  .pagination-container {
    display: flex;
    justify-content: center;
  }
  .main-container {
    min-height: 500px;
    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      ul {
        li {
          height: 95px;
        }
      }
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        width: 420px;
        padding: 0;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
              img {
                background-color: transparent;
              }
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 20px;
                }
                &.edition {
                  span {
                    padding: 0 5px;
                    color: $gjwColor;
                    font-size: 12px;
                    border: 2px solid $gjwColor;
                    border-radius: 5px;
                  }
                }
                &.color {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
              line-height: 74px;
            }
            .count {
              width: 80px;
              line-height: 74px;
            }
          }
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: #fa2a2d;
        }
      }
      &.del {
        a {
          display: inline-block;
          padding-top: 10px;
          color: #fa2a2d;
        }
      }
    }
  }
}
</style>
