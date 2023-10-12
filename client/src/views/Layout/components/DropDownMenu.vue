<!-- 下拉菜单 子组件 -->

<script setup>
import { watchEffect, ref } from 'vue'

const props = defineProps({ list: Object }) // 父传子
const goodsList = ref([])
watchEffect(() => {
  if (props.list && props.list.products) {
    goodsList.value = props.list.products.slice(0, 6) // 获取类型商品列表
  }
})
</script>

<template>
  <div class="nav-container">
    <ul class="nav-ul">
      <li v-for="item in goodsList" :key="item.id">
        <RouterLink :to="`/detail/${item.id}`" target="_blank">
          <div class="nav-img">
            <img v-img-lazy="item.goods_img" alt="" />
          </div>
          <div class="nav-title">{{ item.goodsname }}</div>
          <p class="nav-price">{{ item.price }}元起</p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nav-container {
  overflow: hidden;
  position: absolute;
  top: 74px;
  left: 50%;
  z-index: 100;
  width: 100%;
  min-width: 1400px;
  height: 230px;
  padding: 0 8%;
  transform: translateX(-50%);
  .nav-ul {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    li:not(:first-child)::before {
      position: absolute;
      left: 0;
      top: 35px;
      z-index: 10;
      width: 1px;
      height: 100px;
      background-color: #e0e0e0;
      content: '';
    }
    li {
      position: relative;
      width: 204px;
      padding: 35px 12px 0;
      text-align: center;
    }
    a {
      display: inline-block;
      width: 100%;
      height: 180px;
      margin: 0 auto;
      color: #757575;
      font-size: 12px;
      .nav-img {
        margin: 0 auto 16px;
        img {
          height: 120px;
          background-color: transparent;
        }
      }
      .nav-title {
        width: 180px;
        margin: 0 auto;
        color: #333;
        line-height: 20px;
      }
      .nav-price {
        width: 180px;
        margin: 0;
        line-height: 20px;
        color: $gjwColor;
      }
    }
  }
}
</style>
