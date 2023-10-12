<!-- 电梯导航 子组件-->

<script setup>
import { ShoppingTrolley, Service, Top } from '@element-plus/icons-vue' // 导入组件图标
import { useUserStore, useCartStore } from '@/stores' // 导入仓库文件
import { useScroll } from '@vueuse/core' // 导入usevue函数库
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'

const userStore = useUserStore() // 注册用户仓库
const cartStore = useCartStore() // 注册购物车仓库
if (userStore.token) cartStore.getCartList() // 获取购物车数据
const props = defineProps({ list: Array }) // 父传子
const { y } = useScroll(window) // 获取页面在Y轴上滚动的距离
const showElevator = ref(false) // 是否显示组件
const sections = ref([]) // 导航栏列表

watchEffect(() => {
  sections.value = props.list.map((item) => item.brand) // 获取导航栏列表
  if (sections.value.length > 0) {
    sections.value.push('热销单品')
  }
})

onMounted(() => {
  const handleScroll = () => {
    // 判断是否显示组件
    if (y.value > 500 && !showElevator.value) {
      showElevator.value = true
    } else if (y.value <= 500 && showElevator.value) {
      showElevator.value = false
    }
  }

  // 当页面滚动时,调用 handleScroll 函数
  window.addEventListener('scroll', handleScroll)
  // 当组件卸载时,移除滚动事件的监听器
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <transition name="fade">
    <div class="elevator" v-show="showElevator">
      <div class="elevator-scroll">
        <div class="elevator-top">
          <button
            v-for="(item, i) in sections"
            :key="i"
            @click="y = 850 + 700 * i"
            :class="{ active: y > 848 + 700 * i && y < 848 + 700 * (i + 1) }"
          >
            {{ item }}
          </button>
        </div>
        <div class="elevator-bottom">
          <router-link to="/cart">
            <el-icon><ShoppingTrolley /></el-icon>
            <span v-if="cartStore.totalNum" class="shopNum">{{
              cartStore.totalNum
            }}</span>
            <p>购物车</p>
          </router-link>
          <a href="javascript:;">
            <el-icon><Service /></el-icon>
            <p>在线客服</p>
          </a>
          <a href="javascript:;" @click="y = 0">
            <el-icon><Top /></el-icon>
            <p>返回顶部</p>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.elevator {
  position: fixed;
  top: 50%;
  right: 20px;
  z-index: 999;
  padding: 20px 0;
  background-color: #fff;
  transform: translateY(-50%);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;

  .elevator-scroll {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .elevator-top button,
  .elevator-bottom a {
    display: block;
    position: relative;
    width: 80px;
    height: 40px;
    color: #999;
    font-size: 12px;
    border: none;
    cursor: pointer;
    background-color: #fff;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s;
    &:hover {
      color: #000;
    }
    &.active {
      color: #fff;
      font-weight: bold;
      background-color: #000;
    }
    .shopNum {
      display: inline-block;
      position: absolute;
      top: 0;
      right: 20px;
      width: 17px;
      height: 17px;
      color: #fff;
      font-size: 12px;
      line-height: 17px;
      border-radius: 50%;
      background-color: $gjwColor;
    }
  }
  .elevator-bottom a {
    height: 56px;
    i {
      padding-top: 10px;
      font-size: 30px;
      font-weight: bold;
    }
  }
}
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
