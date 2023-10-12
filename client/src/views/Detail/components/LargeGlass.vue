<!-- 放大镜 子组件 -->

<script setup>
import { useMouseInElement } from '@vueuse/core' // 导入vueuse函数
import { ref, watch } from 'vue'

const props = defineProps({ goodsImg: String })
const target = ref(null) // 绑定下方的图片盒子
const left = ref(0) // 滑块横向位置
const top = ref(0) // 滑块竖向位置
const positionX = ref(0) // 大图横向位置
const positionY = ref(0) // 大图竖向位置
// 获取鼠标在盒子中的位置
const { elementX, elementY, isOutside } = useMouseInElement(target)

// 监听鼠标移动
watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) return // 判断鼠标是否在盒子中
  // 横向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  // 竖向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }
  // 边界处理
  if (elementX.value > 300) left.value = 200
  if (elementX.value < 100) left.value = 0
  if (elementY.value > 300) top.value = 200
  if (elementY.value < 100) top.value = 0
  // 大图位置
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})
</script>

<template>
  <div class="product-show">
    <div class="product-img" ref="target">
      <img :src="props.goodsImg" alt="" />
      <div
        class="mask"
        v-if="!isOutside"
        :style="{ left: `${left}px`, top: `${top}px` }"
      ></div>
    </div>
    <div class="big" v-if="!isOutside">
      <img
        :src="props.goodsImg"
        :style="{ left: `${positionX}px`, top: `${positionY}px` }"
        alt=""
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-show {
  position: relative;
  width: 450px;
  height: 450px;
  padding-left: 20px;
  .product-img {
    position: relative;
    width: 400px;
    height: 400px;
    padding: 20px;
    border: 2px solid #eee;
    text-align: center;
    line-height: 360px;
    cursor: move;
    img {
      width: 250px;
      background-color: transparent;
    }
    .mask {
      position: absolute;
      z-index: 99;
      width: 200px;
      height: 200px;
      background-color: #fede4f;
      border: 1px solid #ccc;
      opacity: 0.5;
    }
  }
  .big {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 430px;
    z-index: 99;
    width: 400px;
    height: 400px;
    text-align: center;
    border: 1px solid #ccc;
    background-color: #fff;
    img {
      position: absolute;
      width: 800px;
      height: 800px;
      max-width: none;
      max-height: none;
      border: 20px solid #fff;
      /* 注意图片要比盒子大!! */
      object-fit: contain;
      vertical-align: middle;
      background-color: #fff;
    }
  }
}
</style>
