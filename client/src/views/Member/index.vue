<!-- 个人中心页 二级路由 -->

<script setup></script>

<template>
  <div class="layout">
    <div class="member">
      <div class="user-manage">
        <h4>我的账户</h4>
        <div class="links">
          <RouterLink to="/member/user">个人中心</RouterLink>
        </div>
        <h4>交易管理</h4>
        <div class="links">
          <RouterLink to="/member/order">我的订单</RouterLink>
        </div>
      </div>
    </div>
    <div class="article">
      <!-- 三级路由出口 -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  margin-bottom: 20px;
  padding-top: 20px;
}
.member {
  width: 220px;
  margin-right: 20px;
  border-radius: 2px;
  background-color: #fff;
  .user-manage {
    background-color: #fff;
    h4 {
      font-size: 18px;
      font-weight: 400;
      padding: 20px 52px 5px;
      border-top: 1px solid #f6f6f6;
    }
    .links {
      padding: 0 52px 10px;
    }
    a {
      display: block;
      line-height: 1;
      padding: 15px 0;
      font-size: 14px;
      color: #666;
      position: relative;
      &:hover {
        color: $gjwColor;
      }
      &.active,
      &.router-link-exact-active {
        color: $gjwColor;
        &:before {
          display: block;
        }
      }
      &:before {
        content: '';
        display: none;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        top: 19px;
        left: -16px;
        background-color: $gjwColor;
      }
    }
  }
}
.article {
  width: 1000px;
  min-height: 574px;
  background-color: #fff;
}
</style>
