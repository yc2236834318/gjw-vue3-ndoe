<!-- 商品支付页 二级路由 -->

<script setup>
import { payOrderApi } from '@/apis/pay' // 导入支付请求接口
import { useOrderStore, useUserStore } from '@/stores' // 导入仓库文件
import { useRouter, useRoute } from 'vue-router' // 导入路由模块
import { onMounted, ref } from 'vue'
import { myAlert } from '@/composables/myAlert'

const route = useRoute() // 注册路由参数
const router = useRouter() // 注册路由对象
const userStore = useUserStore() // 注册用户仓库
const orderStore = useOrderStore() // 注册订单仓库
const payInfo = ref({}) // 订单信息
// 获取订单信息
const getPayInfo = async () => {
  const res = await orderStore.getOrderById(route.query.id)
  payInfo.value = res.data[0]
}
onMounted(() => getPayInfo())
// 余额支付
const payFn = async () => {
  await payOrderApi(route.query.id)
  myAlert('支付成功')
  userStore.getUser() // 重新获取用户信息
  // 跳转到支付结果页
  router.replace({
    path: '/payBack',
    query: {
      id: route.query.id
    }
  })
}
const notPay = () => {
  myAlert('接口关闭')
}
</script>

<template>
  <div class="pay">
    <div class="layout">
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon">
          <img src="/images/zf.png" alt="" />
        </span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付</p>
        </div>
        <div class="amount" v-if="payInfo">
          <span>应付总额：</span>
          <span>&yen; {{ payInfo.total_price }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" @click="notPay" href="javascript:;"></a>
          <a class="btn alipay" @click="notPay" href="javascript:;"></a>
          <a class="btn" @click="payFn" href="javascript:;">
            余额支付
            <span class="balance">&yen; {{ userStore.userInfo.balance }}</span>
          </a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" @click="notPay" href="javascript:;">招商银行</a>
          <a class="btn" @click="notPay" href="javascript:;">工商银行</a>
          <a class="btn" @click="notPay" href="javascript:;">建设银行</a>
          <a class="btn" @click="notPay" href="javascript:;">农业银行</a>
          <a class="btn" @click="notPay" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay {
  margin-top: 20px;
}
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    img {
      width: 120px;
      height: 120px;
      background-color: transparent;
    }
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      color: #20ceb4;
      font-size: 20px;
    }
  }
  .amount {
    span {
      vertical-align: middle;
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  padding-bottom: 70px;
  .balance {
    color: crimson;
  }
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    display: inline-block;
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    vertical-align: middle;
    &.active,
    &:hover {
      border-color: $gjwColor;
    }
    &.alipay {
      background: url(/images/zfb.png) no-repeat center / contain;
    }
    &.wx {
      background: url(/images/wx.jpg) no-repeat center / contain;
    }
  }
}
</style>
