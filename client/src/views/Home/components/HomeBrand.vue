<!-- 品牌商品模块 子组件-->

<script setup>
import { CirclePlusFilled } from '@element-plus/icons-vue' // 导入组件图标
import { useGoodsStore } from '@/stores' // 导入仓库文件
import GoodsItem from '@/views/Home/components/GoodsItem.vue' // 导入子组件
import { ref } from 'vue'

const brandCover = ref([])
const goodsStore = useGoodsStore() // 注册商品仓库
goodsStore.getGoodsHd() // 获取商品横幅
goodsStore.getBrandCover().then(() => {
  brandCover.value = goodsStore.brandCover
})
</script>

<template>
  <div class="main">
    <div class="layout">
      <div class="main-hd">
        <RouterLink to="/detail/11001" target="_blank">
          <img :src="goodsStore.goodsHd" alt="" />
        </RouterLink>
      </div>
      <div class="main-container">
        <!-- 品牌商品渲染 -->
        <div
          class="main-box"
          v-for="(item, i) in goodsStore.goodsList"
          :key="item.id"
        >
          <div class="box-hd">
            <h2>{{ item.brand }}</h2>
            <div class="more">
              <RouterLink :to="`/category/${item.brandname}`">
                查看更多<el-icon><CirclePlusFilled /></el-icon>
              </RouterLink>
            </div>
          </div>
          <div class="box-bd">
            <!-- 品牌封面 -->
            <div class="goods" v-if="brandCover[i]">
              <RouterLink :to="`/detail/${brandCover[i].id}`" target="_blank">
                <img v-img-lazy="brandCover[i].banner_img" alt="" />
              </RouterLink>
            </div>
            <!-- 品牌商品-子组件 -->
            <GoodsItem
              v-for="i in item.products.slice(0, 8)"
              :key="i"
              :goodsInfo="i"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background-color: #f6f6f6;
  .main-hd {
    width: 1226px;
    margin-bottom: 22px;
    padding-top: 22px;
  }
  .main-container {
    padding-bottom: 10px;
    .main-box {
      margin-bottom: 20px;
      .box-hd {
        position: relative;
        h2 {
          margin: 0;
          padding: 20px 0;
          font-size: 26px;
          line-height: 36px;
          color: #000;
          font-weight: 500;
        }
        .more {
          position: absolute;
          top: 0;
          right: 20px;
          a {
            color: #424242;
            font-size: 16px;
            line-height: 76px;
            transition: all 0.4s;
            i {
              position: absolute;
              top: 29.5px;
              right: -20px;
              font-size: 18px;
            }
            &:hover {
              color: $gjwColor;
            }
          }
        }
      }
      .box-bd {
        display: grid;
        grid-template-columns: repeat(5, 1fr); // 5列,平均分配
        grid-template-rows: repeat(2, 1fr); // 2行,平均分配
        row-gap: 20px; // 行间距
        column-gap: 20px; // 列间距
        width: 100%;
        height: 614px;
        .goods {
          background-color: #fff;
          transition: all 0.2s linear;
          text-align: center;
          &:hover {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            transform: translate3d(0, -2px, 0);
          }
        }
        & .goods:first-child {
          // 第一个商品
          a {
            padding: 0;
            img {
              width: 224px;
              height: 614px;
              margin: 0;
            }
          }
        }
        & .goods:nth-of-type(1) {
          /* 第1个盒子:上下合并行 */
          grid-row-start: 1;
          grid-row-end: 3;
          /* 从第1根行线合并到第3根行线 */
        }
      }
    }
  }
}
</style>
