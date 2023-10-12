<!-- 轮播图模块 子组件-->

<script setup>
import { useFocusStore } from '@/stores' // 导入仓库文件

const focusStore = useFocusStore() // 注册分类仓库
focusStore.getSwiperList() // 获取轮播图列表
</script>

<template>
  <div class="home-banner">
    <el-carousel>
      <el-carousel-item v-for="item in focusStore.swiperList" :key="item.id">
        <RouterLink :to="`/detail/${item.id}`" target="_blank">
          <img v-img-lazy="item.banner_img" alt="" />
        </RouterLink>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.home-banner {
  position: absolute;
  left: 0;
  top: 30px;
  z-index: 19;
  width: 1240px;
  height: 460px;
  img {
    width: 100%;
    height: 460px;
  }
}
// 轮播图控件
.el-carousel {
  height: 460px;
  ::v-deep(.el-carousel__container) {
    height: 100%;
  }
  ::v-deep(.el-carousel__button) {
    // 下方指示器
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  ::v-deep(.el-carousel__arrow) {
    // 左右箭头
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  ::v-deep(.el-carousel__arrow--left) {
    // 左箭头
    left: 250px;
  }
}
</style>
