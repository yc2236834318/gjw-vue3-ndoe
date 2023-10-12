<!-- 商品模块 子组件-->

<script setup>
defineProps({
  goodsInfo: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <!-- 品牌商品 -->
  <div class="goods">
    <RouterLink :to="`/detail/${goodsInfo.id}`" target="_blank">
      <img v-img-lazy="goodsInfo.goods_img" alt="" />
      <h3>{{ goodsInfo.goodsname }}</h3>
      <span>{{ goodsInfo.description }}</span>
      <p>{{ goodsInfo.price }}元起</p>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.goods {
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #757575;
    img {
      display: block;
      height: 130px;
      margin: 30px auto 20px;
      background-color: transparent;
    }
    h3 {
      width: 204px;
      margin: 2px 10px;
      color: #333;
      font-size: 18px;
      /* 文字溢出省略 */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    span {
      color: #b0b0b0;
      font-size: 12px;
    }
    p {
      margin: 5px 10px 14px;
      color: $gjwColor;
      font-size: 14px;
    }
  }
}
</style>
