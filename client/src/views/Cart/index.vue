<!-- 购物车页 二级路由 -->

<script setup>
import CartList from '@/views/Cart/components/CartList.vue'
</script>

<template>
  <div class="cart">
    <div class="layout">
      <div class="cart-container">
        <CartList />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  background-color: #f5f5f5;
  .cart-container {
    position: relative;
    padding: 50px 0;
  }
}
</style>
