<!-- 架子导航栏 子组件 -->

<script setup>
import { ArrowDownBold, ShoppingTrolley } from '@element-plus/icons-vue' // 导入组件图标
// 导入仓库文件
import {
  useUserStore,
  useCartStore,
  useReceStore,
  useOrderStore
} from '@/stores'
import { useRouter } from 'vue-router' // 导入路由对象
import { myAlert } from '@/composables/myAlert' // 导入提示弹窗
import { storeToRefs } from 'pinia'

const router = useRouter() // 注册路由对象
const userStore = useUserStore() // 注册用户仓库
const cartStore = useCartStore() // 注册购物车仓库
const receStore = useReceStore() // 注册收货仓库
const orderStore = useOrderStore() // 注册订单仓库
const { userInfo } = storeToRefs(userStore) // 解构用户信息
if (userStore.token) cartStore.getCartList() // 获取购物车数据

// 退出登录
const exit = () => {
  ElMessageBox.confirm('确定退出登录？', '温馨提示', {
    type: 'Warning',
    showClose: false,
    lockScroll: false,
    closeOnClickModal: false,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(() => {
      userStore.removeToken() // 清除pinia中的token
      userStore.setUser({}) // 清除pinia中的用户信息
      cartStore.clearCart() // 清除pinia中的购物车信息
      receStore.clearRece() // 清除pinia中的用户收货信息
      orderStore.clearOrder() // 清除pinia中的订单信息
      myAlert('退出成功')
      router.replace('/login') // 跳转到登录页
    })
    .catch(() => {})
}
</script>

<template>
  <nav class="shortcut">
    <div class="layout">
      <ul class="shortcut-list">
        <li><RouterLink to="/">首页</RouterLink></li>
        <li><RouterLink to="/category">分类</RouterLink></li>
        <li><RouterLink to="/category/phone">手机</RouterLink></li>
        <li><RouterLink to="/category/pad">平板</RouterLink></li>
        <li><RouterLink to="/category/notebook">笔记本</RouterLink></li>
        <li>
          <!-- 下拉菜单-下载APP -->
          <el-dropdown>
            <a href="javascript:;">
              下载APP<el-icon><ArrowDownBold /></el-icon>
            </a>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div class="shortcut-app">
                    <img src="/images/app.png" alt="" />
                    <p>购机网APP</p>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
      <!-- 已登录 -->
      <ul class="userinfo" v-if="userStore.token">
        <li>
          <!-- 下拉菜单-用户信息 -->
          <el-dropdown v-if="userInfo">
            <RouterLink to="/member" class="face">
              <img
                :src="userInfo.user_pic ? userInfo.user_pic : 'images/face.png'"
                alt=""
              />
              <span class="nickname">{{ userInfo.nickname }}</span>
            </RouterLink>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/member')">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item @click="router.push('/cart')">
                  购<i />物<i />车
                </el-dropdown-item>
                <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <li>
          <!-- 购物车 -->
          <RouterLink to="/cart" class="cart-user">
            <el-icon><ShoppingTrolley /></el-icon>
            购物车
            <span class="shopNum" v-if="cartStore.totalNum">{{
              cartStore.totalNum
            }}</span>
          </RouterLink>
        </li>
      </ul>
      <!-- 未登录 -->
      <div class="login" v-else>
        <RouterLink to="/login">登录</RouterLink>
        <RouterLink to="/login">注册</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
// 导航栏
.shortcut {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  min-width: 1200px;
  height: 36px;
  background-color: #000;
  .layout {
    display: flex;
    justify-content: space-between;
    a {
      color: #fff;
      opacity: 0.8;
      line-height: 36px;
      font-size: 13px;
      &:hover {
        opacity: 1;
      }
      i {
        margin-left: 2px;
        vertical-align: middle;
      }
    }
    .shortcut-list {
      li {
        float: left;
        margin-right: 40px;
      }
    }
  }
}
// 二维码
.shortcut-app {
  img {
    width: 90px;
    height: 90px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  p {
    color: #333;
    text-align: center;
  }
}
// 已登录
.shortcut .userinfo {
  display: flex;
  height: 36px;
  text-align: center;
  .face {
    color: #fff;
    img {
      width: 25px;
      border-radius: 50%;
    }
    .nickname {
      display: inline-block;
      width: 60px;
      margin-left: 5px;
      text-align: left;
      vertical-align: top;
      /* 文本省略 */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .cart-user {
    position: relative;
    margin-left: 10px;
    i {
      font-size: 18px;
    }
    .shopNum {
      display: inline-block;
      width: 17px;
      height: 17px;
      margin-left: -3px;
      color: #fff;
      font-size: 12px;
      line-height: 17px;
      border-radius: 50%;
      background-color: $gjwColor;
    }
  }
}
// 未登录
.shortcut .login {
  a:first-of-type {
    margin-right: 5px;
  }
}
</style>
