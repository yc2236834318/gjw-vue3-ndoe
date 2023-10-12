<!-- 热销模块 子组件-->

<script setup></script>

<template>
  <div class="hot">
    <div class="layout">
      <div class="hot-hd">
        <h2>热销单品</h2>
      </div>
      <div class="hot-container">
        <!-- 全局通用组件 焦点图 -->
        <GoodsSlider />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hot {
  width: 100%;
  height: 480px;
  background-color: #f6f6f6;
  .hot-hd {
    h2 {
      margin: 0;
      padding-bottom: 20px;
      color: #000;
      font-size: 26px;
      line-height: 36px;
      font-weight: 500;
    }
  }
}
</style>
