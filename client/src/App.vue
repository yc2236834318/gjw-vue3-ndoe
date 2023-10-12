<!-- 根组件 App -->

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 导入中文包
</script>

<template>
  <div id="app">
    <!-- 将所有element-plus组件设置为中文语言 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style lang="scss" scoped></style>
