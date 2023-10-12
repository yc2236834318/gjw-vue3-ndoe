<!-- 分类模块 子组件-->

<script setup>
import { ArrowRightBold } from '@element-plus/icons-vue' // 导入组件图标
import { useGoodsStore } from '@/stores' // 导入仓库文件

const goodsStore = useGoodsStore() // 注册商品仓库
</script>

<template>
  <div class="category">
    <ul class="category-list">
      <li v-for="item in goodsStore.reGoodsList" :key="item.id">
        <RouterLink :to="`/category/${item.brandname}`" class="category-a">
          {{ item.brand }}<el-icon><ArrowRightBold /></el-icon>
        </RouterLink>
        <div class="category-item">
          <ul class="children-list">
            <li v-for="i in item.products" :key="i">
              <RouterLink :to="`/detail/${i.id}`" target="_blank">
                <img v-img-lazy="i.goods_img" alt="" />
                <span>{{ i.goodsname }}</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.category {
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 20;
  width: 234px;
  height: 460px;
  padding: 20px 0;
  font-size: 14px;
  background: rgba(105, 101, 101, 0.6);
  .category-list {
    li {
      background-color: transparent;
      &:hover {
        background-color: $gjwColor;
      }
      &:hover .category-item {
        display: block;
      }
      a {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 42px;
        padding-left: 30px;
        color: #fff;
        line-height: 42px;
        i {
          position: absolute;
          top: 10px;
          right: 20px;
          color: #e0e0e0;
          font-size: 16px;
          font-weight: bold;
          line-height: 16px;
        }
      }
      .category-item {
        display: none;
        position: absolute;
        left: 234px;
        top: 0;
        z-index: 24;
        width: 796px;
        height: 460px;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-left: 0;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
        .children-list {
          overflow: hidden;
          float: left;
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          width: 100%;
          height: 458px;
          margin: 0;
          padding: 2px 0;
          li {
            position: relative;
            width: 265px;
            height: 100px;
            a {
              display: block;
              width: 100%;
              height: 100%;
              padding: 20px;
              line-height: 60px;
              color: #333;
              transition: color 0.2s;
              &:hover {
                background-color: #fff;
                color: #ff6700;
              }
              &::after {
                content: '';
              }
              img {
                float: left;
                width: 45px;
                height: 55px;
                margin-right: 8px;
                background-color: transparent;
              }
              span {
                float: left;
                width: 172px;
                line-height: 60px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>
