<!-- 商品结算页 二级路由 -->

<script setup>
import CutDialog from '@/views/Checkout/components/CutDialog.vue' // 导入子组件
import AddDialog from '@/views/Checkout/components/AddDialog.vue' // 导入子组件
// 导入仓库文件
import {
  useCartStore,
  useUserStore,
  useReceStore,
  useOrderStore
} from '@/stores'
import { ref } from 'vue'
import { myAlert } from '@/composables/myAlert'
import { useRouter } from 'vue-router'

const userStore = useUserStore() // 注册用户仓库
const receStore = useReceStore() // 注册收货仓库
const cartStore = useCartStore() // 注册购物车仓库
const orderStore = useOrderStore() // 注册订单仓库
const router = useRouter() // 注册路由对象
const defaultRece = ref({}) // 默认收货地址
if (userStore.token) cartStore.getCartSubmit() // 获取结算商品列表
if (cartStore.cartSubmit.list.length < 1) router.replace('/cart') // 判断购物车是否有商品

// 设置默认收货地址
const updateReceList = () => {
  if (receStore.receList.length > 0) {
    defaultRece.value = receStore.receList[0]
  }
}
updateReceList()
// 切换收货地址(父子通信)
const changeAddress = (value) => {
  defaultRece.value = value
}
// 收货时间和支付样式
const timeRef = ref(1)
const methodRef = ref(1)
const cutTime = (value) => {
  timeRef.value = value
}
const cutMethod = (value) => {
  methodRef.value = value
}
// 提交订单
const data = new Date()
const submitOrder = async () => {
  if (!defaultRece.value.phone) return myAlert('请填写收货地址')
  // 订单参数
  const orderForm = ref({
    ...defaultRece.value,
    total_num: cartStore.cartSubmit.totalNum,
    total_price: cartStore.cartSubmit.totalPrice + 10,
    pay_method: '未支付',
    creat_date: data.toLocaleString(),
    goods_list: JSON.stringify(
      cartStore.cartSubmit.list.map((item) => {
        return {
          id: item.id,
          uid: item.uid,
          gid: item.goods_id,
          goods_img: item.goods_img.substring(14),
          goodsname: item.goodsname,
          price: item.price,
          goods_num: item.goods_num,
          goods_edition: item.goods_edition,
          goods_color: item.goods_color
        }
      })
    )
  })
  const res = await orderStore.addOrder(orderForm.value) // 发起提交请求
  const orderID = res.data.id // 获取订单ID
  cartStore.getCartList() // 更新购物车列表
  myAlert('订单创建成功')
  // 路由跳转
  router.replace({
    path: '/pay',
    query: {
      id: orderID
    }
  })
}
</script>

<template>
  <div class="checkout">
    <div class="container">
      <div class="layout">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <ul v-if="defaultRece.phone">
                <li>
                  <span>收<i />货<i />人：{{ defaultRece.consignee }}</span>
                </li>
                <li>
                  <span>联系方式：{{ defaultRece.phone }}</span>
                </li>
                <li>
                  <span
                    >收货地址：{{
                      defaultRece.area + defaultRece.address
                    }}</span
                  >
                </li>
              </ul>
              <div class="none" v-else>您需要先选择收货地址才可提交订单。</div>
            </div>
            <div class="action">
              <!-- 切换地址 子组件 -->
              <CutDialog
                :receList="receStore.receList"
                @cutAddress="changeAddress"
              />
              <!-- 添加地址 子组件 -->
              <AddDialog @updateList="updateReceList" />
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore.cartSubmit.list" :key="item.id">
                <td>
                  <RouterLink
                    :to="'/detail/' + item.goods_id"
                    target="_blank"
                    class="info"
                  >
                    <img :src="item.goods_img" alt="" />
                    <div class="right">
                      <p>
                        <span class="g_name">{{ item.goodsname }}</span>
                      </p>
                      <p>
                        型号：<span class="g_ed">{{ item.goods_edition }}</span>
                      </p>
                      <p>
                        颜色：<span class="g_co">{{ item.goods_color }}</span>
                      </p>
                    </div>
                  </RouterLink>
                </td>
                <td>&yen; {{ item.price }}</td>
                <td>{{ item.goods_num }}</td>
                <td>&yen; {{ item.price * item.goods_num }}</td>
                <td style="color: crimson; font-weight: bold">
                  &yen; {{ item.price * item.goods_num }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <span
            :class="{ active: timeRef === 1 }"
            @click="cutTime(1)"
            class="my-btn"
          >
            不限送货时间：周一至周日
          </span>
          <span
            :class="{ active: timeRef === 2 }"
            @click="cutTime(2)"
            class="my-btn"
          >
            工作日送货：周一至周五
          </span>
          <span
            :class="{ active: timeRef === 3 }"
            @click="cutTime(3)"
            class="my-btn"
          >
            双休日、假日送货：周六至周日
          </span>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <span
            :class="{ active: methodRef === 1 }"
            @click="cutMethod(1)"
            class="my-btn"
          >
            在线支付
          </span>
          <span
            :class="{ active: methodRef === 2 }"
            @click="cutMethod(2)"
            class="my-btn"
          >
            货到付款
          </span>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ cartStore.cartSubmit.totalNum }} 件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>&yen; {{ cartStore.cartSubmit.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>&yen; 10</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">
                &yen; {{ (cartStore.cartSubmit.totalPrice + 10).toFixed(2) }}
              </dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="submitOrder" type="primary" size="large"
            >提交订单</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout {
  margin-top: 40px;
  margin-bottom: 40px;
  .layout {
    background: #fff;
    padding: 0 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.04);
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
      span {
        cursor: pointer;
      }
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: $gjwColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    display: flex;
    justify-content: space-evenly;
    width: 250px;
    margin-right: 100px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      height: 70px;
      margin-right: 20px;
      background-color: transparent;
    }
    .right {
      line-height: 24px;
      p {
        font-size: 12px;
      }
      .g_name {
        font-size: 18px;
        font-weight: bold;
      }
      .g_ed {
        padding: 0 5px;
        color: $gjwColor;
        border: 2px solid $gjwColor;
        border-radius: 5px;
      }
      .g_co {
        color: $gjwColor;
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: $gjwColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        font-weight: bold;
        color: $priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
.empty {
  font-size: 18px;
  text-align: center;
}
</style>
