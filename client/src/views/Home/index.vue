<!-- 首页 二级路由 -->

<script setup>
// 导入子组件
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeBrand from '@/views/Home/components/HomeBrand.vue'
import HomeHot from '@/views/Home/components/HomeHot.vue'
import HomeSwiper from '@/views/Home/components/HomeSwiper.vue'
import { useGoodsStore } from '@/stores' // 导入仓库文件

const goodsStore = useGoodsStore() // 注册商品仓库
goodsStore.getAllGoods() // 获取品牌商品数据
</script>

<template>
  <div class="home">
    <div class="banner">
      <div class="banner-container">
        <div class="focus">
          <HomeCategory />
          <HomeSwiper />
        </div>
        <HomeBanner />
      </div>
    </div>
    <HomeBrand />
    <HomeHot />
    <!-- 全局通用组件 电梯导航 -->
    <LiftNav :list="goodsStore.goodsList" />
  </div>
</template>

<style lang="scss" scoped>
.banner {
  background-color: $deepColor;
}
.banner-container {
  position: relative;
  width: 1200px;
  margin: 0 auto;
}
.focus {
  height: 490px;
}
</style>
