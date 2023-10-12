<!-- 焦点图 子组件-->

<script setup>
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue' // 导入组件图标
import { useGoodsStore } from '@/stores' // 导入仓库文件
import { ref, computed } from 'vue'

const goodsStore = useGoodsStore() // 注册商品仓库
goodsStore.getHotGoodsList() // 获取热销商品

const itemsPerPage = 4 // 一页显示4个商品
const currentIndex = ref(0)
const scrollX = computed(() => currentIndex.value * 1200) // 每次移动4个项目的宽度
// 左侧按钮
const prev = () => {
  if (currentIndex.value > 0) currentIndex.value--
}
// 右侧按钮
const next = () => {
  if (
    currentIndex.value + 1 <
    Math.ceil(goodsStore.hotGoodsList.length / itemsPerPage)
  ) {
    currentIndex.value++
  }
}
</script>

<template>
  <div class="carousel">
    <div class="carousel-viewport">
      <div class="carousel-container">
        <div
          class="carousel-items-wrapper"
          :style="{ transform: `translateX(-${scrollX}px)` }"
        >
          <div class="carousel-items">
            <div
              class="carousel-item"
              v-for="item in goodsStore.hotGoodsList"
              :key="item"
            >
              <RouterLink :to="`/detail/${item.id}`" target="_blank">
                <div class="hot-img">
                  <img v-img-lazy="item.goods_img" alt="" />
                </div>
                <h3>{{ item.goodsname }}</h3>
                <span>{{ item.description }}</span>
                <p>
                  预估到手价<i>&yen; {{ item.cost }}</i>
                  <em>&yen; {{ item.price }}</em>
                </p>
              </RouterLink>
            </div>
          </div>
        </div>
        <button class="prev-button" @click="prev">
          <el-icon><ArrowLeftBold /></el-icon>
        </button>
        <button class="next-button" @click="next">
          <el-icon><ArrowRightBold /></el-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  .carousel-viewport {
    width: 100%;
    height: 480px;
    overflow: hidden;
    .carousel-container {
      display: flex;
      height: 380px;
      .carousel-items-wrapper {
        display: flex;
        transition: transform 0.3s ease;
        .carousel-items {
          display: flex;
          justify-content: space-between;
          width: 2400px;
          height: 380px;
          .carousel-item {
            width: 285px;
            background-color: #fff;
            transition: all 0.2s linear;
            &:not(:nth-of-type(4n)) {
              margin-right: 20px;
            }
            &:hover {
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
              transform: translate3d(0, -2px, 0);
            }
          }
        }
      }
    }
  }
}
.carousel-item {
  text-align: center;
  a {
    display: inline-block;
    width: 100%;
    height: 380px;
    .hot-img {
      margin: 0 auto;
      padding-top: 80px;
      padding-bottom: 43px;
      img {
        display: block;
        margin: 0 auto;
        width: 100px;
      }
    }
    h3 {
      width: 225px;
      height: 24px;
      margin: 0 auto;
      line-height: 24px;
      font-size: 16px;
      font-weight: normal;
      color: #000;
      letter-spacing: 0;
    }
    span {
      display: block;
      width: 225px;
      height: 16px;
      margin: 0 auto;
      padding-top: 4px;
      color: #999;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0;
    }
    p {
      height: 26px;
      padding: 30px 0 50px;
      color: #000;
      font-size: 13px;
      line-height: 26px;
      i {
        position: relative;
        bottom: -1px;
        margin-left: 4px;
        margin-right: 4px;
        font-size: 16px;
        font-weight: bold;
      }
      em {
        color: #999;
        font-size: 12px;
        font-style: normal;
        line-height: 20px;
        text-decoration: line-through;
      }
    }
  }
}
.prev-button,
.next-button {
  position: absolute;
  top: 40%;
  width: 50px;
  height: 100px;
  color: dodgerblue;
  font-size: 40px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  transform: translateY(-50%);
  &:hover {
    color: #fff;
    background-color: #999;
  }
}
.prev-button {
  left: 0;
}
.next-button {
  right: 0;
}
</style>
