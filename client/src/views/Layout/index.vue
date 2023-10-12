<!-- 网站架子 一级路由 -->

<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import { useUserStore, useReceStore } from '@/stores' // 导入仓库文件

const usersStore = useUserStore() // 注册用户仓库
const receStore = useReceStore() // 注册收货仓库
if (usersStore.token) {
  usersStore.getUser() // 获取用户信息
  receStore.getReceList() // 获取收货信息
}
</script>

<template>
  <div class="container">
    <LayoutNav />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
}
</style>
