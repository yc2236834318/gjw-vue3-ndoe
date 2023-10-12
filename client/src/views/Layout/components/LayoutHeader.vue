<!-- 架子头部 子组件 -->

<script setup>
import { Search } from '@element-plus/icons-vue' // 导入组件图标
import { useGoodsStore } from '@/stores' // 导入仓库文件
import { useRouter } from 'vue-router' // 导入路由模块
import DropDownMenu from '@/views/Layout/components/DropDownMenu.vue' // 导入子组件
import { ref } from 'vue'

const router = useRouter() // 注册路由对象
const goodsStore = useGoodsStore() // 注册商品仓库
goodsStore.getGoodsByType() // 获取类型商品数据
const key = ref('') // 搜索关键字
// 搜索函数
const goSearch = () => {
  router.push({
    path: '/search',
    query: {
      key: key.value
    }
  })
  key.value = ''
}
</script>

<template>
  <header class="header">
    <div class="layout">
      <div class="header-left">
        <div class="logo">
          <RouterLink to="/">
            <img src="/images/logo.png" alt="" title="购机网" />
          </RouterLink>
        </div>
        <div class="nav">
          <div class="nav-item">
            <RouterLink to="/category/phone">手机</RouterLink>
            <DropDownMenu class="nav-drop" :list="goodsStore.typeList[2]" />
          </div>
          <div class="nav-item">
            <RouterLink to="/category/pad">平板</RouterLink>
            <DropDownMenu class="nav-drop" :list="goodsStore.typeList[1]" />
          </div>
          <div class="nav-item">
            <RouterLink to="/category/notebook">笔记本</RouterLink>
            <DropDownMenu class="nav-drop" :list="goodsStore.typeList[0]" />
          </div>
          <div class="nav-menu"></div>
        </div>
      </div>
      <!-- 搜索栏 -->
      <div class="header-right">
        <div class="search">
          <input
            v-model="key"
            @keyup.enter="goSearch"
            type="text"
            placeholder="手机 平板 笔记本"
          />
          <el-icon @click="goSearch"><Search /></el-icon>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 100;
  margin-top: 36px;
  min-width: 1400px;
  width: 100%;
  height: 74px;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.04);
  .layout {
    display: flex;
    justify-content: space-between;
  }
}
.header-left {
  display: flex;
  .logo {
    margin-right: 20px;
    img {
      width: 70px;
      height: 70px;
      margin-top: 4px;
    }
  }
  .nav {
    display: flex;
    .nav-item {
      z-index: 100;
      a {
        display: inline-block;
        height: 74px;
        padding: 0 20px;
        font-size: 16px;
        line-height: 74px;
      }
      .nav-drop {
        display: none;
      }
      &:hover a {
        color: $gjwColor;
      }
      &:hover .nav-drop {
        display: block;
      }
    }
    // 下拉菜单背景
    .nav-menu {
      overflow: hidden;
      position: absolute;
      top: 74px;
      left: 0;
      z-index: 99;
      width: 100%;
      min-width: 1400px;
      height: 0;
      background: #fff;
    }
    &:hover .nav-menu {
      height: 230px;
      outline: 1px solid #e0e0e0;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.18);
      transition:
        box-shadow 0.1s 0.2s,
        height 0.2s;
    }
  }
}
.header-right {
  .search {
    position: relative;
    width: 240px;
    height: 30px;
    input {
      width: 240px;
      height: 30px;
      margin-top: 22px;
      font-size: 12px;
      border: 1px solid #999;
      border-radius: 16px;
      text-indent: 15px;
    }
    i {
      position: absolute;
      right: 5px;
      top: 22px;
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: #666;
      cursor: pointer;
    }
  }
}
</style>
