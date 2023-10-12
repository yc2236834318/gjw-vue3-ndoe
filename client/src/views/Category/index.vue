<!-- 分类页 二级路由 -->

<script setup>
import GoodsItem from '@/views/Category/components/GoodsItem.vue'
import { useFilter } from '@/views/Category/composables/useFilter' // 导入函数
import { useGoodsStore } from '@/stores' // 导入仓库文件
import { ref } from 'vue'

const goodsStore = useGoodsStore() // 注册商品仓库
const { total, queryObj, loading, getGoodsList } = useFilter() // 注册函数
getGoodsList() // 获取商品列表

// ---------- 筛选栏模块 ----------

// 筛选选项
const brandIndex = ref(0)
const typeIndex = ref(0)
const priceIndex = ref(0)
const orderIndex = ref(0)
const brandList = ref([
  { label: '全部', data: '%' },
  { label: '华为系列', data: '华为' },
  { label: '小米系列', data: '小米' },
  { label: '红米系列', data: '红米' },
  { label: '苹果系列', data: '苹果' }
])
const typeList = ref([
  { label: '全部', data: '%' },
  { label: '手机', data: 'phone' },
  { label: '平板', data: 'pad' },
  { label: '笔记本', data: 'notebook' }
])
const priceList = ref([
  { label: '全部', min: 0, max: 99999 },
  { label: '3000以下', min: 0, max: 3000 },
  { label: '3000-6000', min: 3000, max: 6000 },
  { label: '6000-8000', min: 6000, max: 8000 },
  { label: '8000以上', min: 8000, max: 99999 }
])
const orderList = ref([
  { label: '价格降序', data: 'desc' },
  { label: '价格升序', data: 'asc' }
])

// ---------- 筛选模块 ----------

const brandFilter = (index, value) => {
  queryObj.value.page = 1
  brandIndex.value = index
  queryObj.value.brand = value
  getGoodsList()
}
const typeFilter = (index, value) => {
  queryObj.value.page = 1
  typeIndex.value = index
  queryObj.value.type = value
  getGoodsList()
}
const priceFilter = (index, min, max) => {
  queryObj.value.page = 1
  priceIndex.value = index
  queryObj.value.min = min
  queryObj.value.max = max
  getGoodsList()
}
const orderFilter = (index, value) => {
  queryObj.value.page = 1
  orderIndex.value = index
  queryObj.value.order = value
  getGoodsList()
}

// ---------- 分页模块 ----------

// 每页条数变化(size 每页条数)
const onSizeChange = (size) => {
  queryObj.value.page = 1
  queryObj.value.per_page = size
  getGoodsList()
}
// 当前页码变化(page 当前页码)
const onCurrentChange = (page) => {
  queryObj.value.page = page
  getGoodsList()
}
</script>

<template>
  <div class="category">
    <div class="layout">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 筛选栏 -->
      <div class="filter">
        <ul class="filter-list">
          <li class="title">品牌：</li>
          <li v-for="(item, index) in brandList" :key="index">
            <span
              :class="{ current: brandIndex === index }"
              @click="brandFilter(index, item.data)"
            >
              {{ item.label }}
            </span>
          </li>
        </ul>
        <ul class="filter-list">
          <li class="title">分类：</li>
          <li v-for="(item, index) in typeList" :key="index">
            <span
              :class="{ current: typeIndex === index }"
              @click="typeFilter(index, item.data)"
            >
              {{ item.label }}
            </span>
          </li>
        </ul>
        <ul class="filter-list">
          <li class="title">价格：</li>
          <li v-for="(item, index) in priceList" :key="index">
            <span
              :class="{ current: priceIndex === index }"
              @click="priceFilter(index, item.min, item.max)"
            >
              {{ item.label }}
            </span>
          </li>
        </ul>
        <ul class="filter-list">
          <li class="title">排序：</li>
          <li v-for="(item, index) in orderList" :key="index">
            <span
              :class="{ current: orderIndex === index }"
              @click="orderFilter(index, item.data)"
            >
              {{ item.label }}
            </span>
          </li>
        </ul>
      </div>

      <!-- 商品模块 -->
      <div class="channel">
        <div class="empty" v-if="total < 1">暂 无 数 据</div>
        <div class="channel-list" v-loading="loading" :style="{ 'z-index': 1 }">
          <GoodsItem
            v-for="item in goodsStore.filterGoodsList"
            :key="item"
            :goodsInfo="item"
          />
        </div>
      </div>

      <!-- 分页模块 -->
      <el-pagination
        v-if="total > 15"
        v-model:current-page="queryObj.page"
        v-model:page-size="queryObj.per_page"
        :background="true"
        layout="prev, pager, next"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: center"
      />

      <!-- 热销单品模块 -->
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

      <!-- 全局通用组件 电梯导航 -->
      <LiftNav :list="[]" />
    </div>
  </div>
</template>

<style scoped lang="scss">
// 面包屑
.category {
  padding-top: 10px;
  padding-bottom: 20px;
  .bread-container {
    padding-top: 16px;
    padding-bottom: 14px;
    color: #666;
    .el-breadcrumb__item {
      height: 12px;
      :deep(.el-breadcrumb__inner) {
        font-size: 12px;
        &.is-link {
          &:hover {
            color: $gjwColor;
          }
        }
      }
      :deep(.el-breadcrumb__separator) {
        margin: 0 3px;
      }
    }
  }
}
// 筛选栏
.filter {
  margin-top: 10px;
  font-size: 12px;
  background-color: #fff;
  & .filter-list:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }
  .filter-list {
    display: flex;
    width: 1152px;
    margin: 0 auto;
    li {
      height: 50px;
      line-height: 50px;
    }
    & li:not(:first-child) {
      margin-right: 40px;
      padding-left: 22px;
      span {
        color: #000;
        cursor: pointer;
      }
    }
    .title {
      text-align: left;
      width: 106px;
      color: #666;
      line-height: 50px;
    }
    .current {
      color: $gjwColor !important;
      font-weight: bold;
    }
  }
}
// 商品列表
.channel {
  width: 1212.5px;
  padding-top: 20px;
  margin-bottom: 20px;
  .empty {
    padding: 20px 0;
    color: #002233;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    background-color: #fff;
  }
  .channel-list {
    display: flex;
    flex-wrap: wrap;
  }
}
// 热销单品
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
