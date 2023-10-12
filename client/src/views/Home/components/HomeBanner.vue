<!-- 推荐模块 子组件-->

<script setup>
import { useFocusStore } from '@/stores' // 导入仓库文件

const focusStore = useFocusStore() // 注册分类仓库
focusStore.getRecomList() // 获取推荐列表
</script>

<template>
  <div class="banner">
    <div class="layout">
      <div class="banner-left">
        <img src="/images/banner.png" alt="" />
      </div>
      <div class="banner-right">
        <ul class="banner-list">
          <li v-for="item in focusStore.recomList" :key="item.id">
            <RouterLink :to="`/detail/${item.id}`" target="_blank">
              <img :src="item.banner_img" alt="" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  .layout {
    display: flex;
    justify-content: space-between;
    width: 1240px;
    padding-top: 20px;
    padding-bottom: 20px;
    .banner-left {
      width: 234px;
    }
    .banner-right {
      width: 992px;
      .banner-list {
        display: flex;
        justify-content: space-between;
        li {
          width: 316px;
          height: 170px;
          transition: all 0.2s linear;
          &:hover {
            transform: translate3d(0, -2px, 0);
            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style>
