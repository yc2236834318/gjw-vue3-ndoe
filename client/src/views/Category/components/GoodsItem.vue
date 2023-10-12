<!-- 商品模块 子组件-->

<script setup>
const props = defineProps({
  goodsInfo: {
    type: Object,
    default: () => {}
  }
})
const goodsInfo = props.goodsInfo
</script>

<template>
  <!-- 筛选商品 -->
  <div class="goods">
    <div class="panels">
      <RouterLink :to="`/detail/${goodsInfo.id}`" target="_blank">
        <div class="goods-img">
          <img v-img-lazy="goodsInfo.goods_img" alt="" />
        </div>
        <h3>{{ goodsInfo.goodsname }}</h3>
        <p class="des">{{ goodsInfo.description }}</p>
        <p class="price">
          <i>&yen;{{ goodsInfo.price }}</i>
        </p>
        <p class="tag" v-if="goodsInfo.activity">
          <i>{{ goodsInfo.activity }}</i>
          <span>限时特价</span>
        </p>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.goods {
  position: relative;
  overflow: hidden;
  width: 230px;
  margin-bottom: 10px;
  margin-right: 12.5px;
  background-color: #fff;
  transition: all 0.2s linear 0s;
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }
  .panels {
    height: 305px;
    text-align: left;
    a {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 12px;
      text-align: center;
      .goods-img {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 180px;
        height: 180px;
        margin: 0 auto;
        margin-top: 30px;
        img {
          width: 130px;
          background-color: transparent;
          vertical-align: top;
        }
      }
      h3 {
        width: 200px;
        max-height: 40px;
        margin: 0 auto;
        padding: 20px 0;
        color: #333;
        font-size: 18px;
        line-height: 10px;
        // 溢出文本省略
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .des {
        width: 200px;
        margin: 0 auto;
        color: #b0b0b0;
        // 溢出文本省略
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        font-size: 20px;
        i {
          font-weight: normal;
          line-height: 24px;
          color: $gjwColor;
        }
      }
      .tag {
        height: 16px;
        i {
          margin-right: 8px;
          padding: 0 5px;
          color: #fff;
          line-height: 16px;
          background: #fa2a2d;
        }
        span {
          margin-right: 4px;
          padding: 0 5px;
          color: #fa2a2d;
          line-height: 14px;
          border: 1px solid #fa2a2d;
        }
      }
    }
  }
}
</style>
