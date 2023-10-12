<!-- 支付结果页 二级路由 -->

<script setup>
import { useOrderStore } from '@/stores' // 导入仓库文件
import { useRouter, useRoute } from 'vue-router' // 导入路由模块
import { onMounted, ref } from 'vue'

const route = useRoute() // 注册路由参数
const router = useRouter() // 注册路由对象
const orderStore = useOrderStore() // 注册订单仓库
const payInfo = ref({}) // 订单信息
// 获取订单信息
const getPayInfo = async () => {
  const res = await orderStore.getOrderById(route.query.id)
  payInfo.value = res.data[0]
}
onMounted(() => getPayInfo())
// 路由跳转
const goOrder = () => {
  router.replace('/member/order') // 订单页
}
const goHome = () => {
  router.replace('/home') // 首页
}
</script>

<template>
  <div class="pay_back">
    <div class="layout">
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="img-box">
          <img src="/images/zf.png" alt="" />
        </span>
        <p class="tit">支付成功</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>余额支付</span></p>
        <p>
          支付金额：<span class="money">&yen; {{ payInfo.total_price }}</span>
        </p>
        <div class="btn">
          <el-button @click="goOrder" type="primary" style="margin-right: 20px"
            >查看订单</el-button
          >
          <el-button @click="goHome">进入首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  .img-box {
    img {
      width: 100px;
      height: 100px;
      background-color: transparent;
    }
  }
  .tit {
    color: #20ceb4;
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .money {
    color: crimson;
  }
}
</style>
