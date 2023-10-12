<!-- 搜索页 二级路由 -->

<script setup>
import GoodsItem from '@/views/Search/components/GoodsItem.vue'
import { useGoodsStore } from '@/stores' // 导入仓库文件
import { useRoute } from 'vue-router' // 导入路由模块
import { onMounted, ref, watch } from 'vue'
import { myAlert } from '@/composables/myAlert'

const route = useRoute() // 注册路由参数
const goodsStore = useGoodsStore() // 注册商品仓库
const key = ref('') // 搜索关键字
const loading = ref(false) // 加载动画
if (route.query.key) key.value = route.query.key

// 商品搜索
const searchGoods = async () => {
  if (typeof key.value === 'string' && key.value.startsWith('%')) key.value = ''
  loading.value = true
  await goodsStore.searchGoods(key.value)
  loading.value = false
}
onMounted(() => {
  searchGoods()
})
const getSearch = () => {
  searchGoods()
  myAlert('搜索成功')
}
// 监听路由参数
watch(
  () => route.query.key,
  (value) => {
    key.value = value
    searchGoods()
  }
)
</script>

<template>
  <div class="search" v-loading="loading">
    <div class="layout">
      <div class="top">
        <el-input
          v-model="key"
          @keyup.enter="getSearch"
          style="width: 60%; height: 40px; margin-right: 20px"
          placeholder="请输入搜索关键字"
        ></el-input>
        <el-button @click="getSearch" type="primary" style="height: 40px"
          >搜 索</el-button
        >
      </div>
      <div class="content">
        <div class="empty" v-if="goodsStore.searchGoodsList.length < 1">
          暂无商品
        </div>
        <div class="list" v-else>
          <!-- 商品列表 子组件 -->
          <GoodsItem
            v-for="item in goodsStore.searchGoodsList"
            :key="item"
            :goodsInfo="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  min-height: 500px;
  margin: 20px 0;
  padding: 20px 0;
}
.top {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.content {
  padding: 30px 0;
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .empty {
    height: 300px;
    margin-top: 20px;
    line-height: 300px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    background-color: #fff;
  }
}
</style>
