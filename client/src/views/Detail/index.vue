<!-- 商品详情页 二级路由 -->

<script setup>
import { detailGetGoodsApi } from '@/apis/detail' // 导入请求接口
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router' // 导入路由模块
import LargeGlass from '@/views/Detail/components/LargeGlass.vue' // 导入子组件
import { useUserStore, useCartStore } from '@/stores' // 导入仓库文件
import { myAlert } from '@/composables/myAlert' // 导入提示弹窗文件
import { ref } from 'vue'

const route = useRoute() // 注册路由参数
const router = useRouter() // 注册路由实例
const userStore = useUserStore() // 注册用户仓库
const cartStore = useCartStore() // 注册购物车仓库
const goodsInfo = ref({}) // 商品信息

// 默认商品配置
const defaultModel = ref({
  gid: route.params.id,
  color: '',
  edition: '',
  num: 1
})
// 选择商品配置
const formModel = ref({ ...defaultModel.value })

// 获取商品信息函数
const getGoodsInfo = async (id = route.params.id) => {
  try {
    const res = await detailGetGoodsApi(id)
    goodsInfo.value = res.data.data[0] // 获取商品信息
    // 商品信息转数组
    goodsInfo.value.edition = goodsInfo.value.edition.split(',')
    goodsInfo.value.color = goodsInfo.value.color.split(',')
    goodsInfo.value.goods_chart = goodsInfo.value.goods_chart.split(',')
    // 设置默认值
    formModel.value.color = goodsInfo.value.color[0]
    formModel.value.edition = goodsInfo.value.edition[0]
  } catch (err) {
    router.replace('/detail/11001') // 防止用户访问不存在的商品
  }
}
getGoodsInfo()
// 路由缓存处理
onBeforeRouteUpdate((to) => {
  getGoodsInfo(to.params.id)
  formModel.value = { ...defaultModel.value }
  formModel.value.gid = to.params.id
})

// 商品数量修改
const changeNum = (value) => {
  formModel.value.num += value
  if (formModel.value.num < 1) return (formModel.value.num = 1)
  if (formModel.value.num > 99) return (formModel.value.num = 99)
}

// 加入购物车
const addCart = async () => {
  // 判断用户是否登录
  if (!userStore.token) {
    myAlert('请先登录')
    router.push('/login')
  } else {
    await cartStore.addCart(formModel.value) // 添加商品
    myAlert('商品添加成功')
    cartStore.getCartList() // 更新购物车列表
  }
}
</script>

<template>
  <div class="detail">
    <div class="layout">
      <div class="product">
        <LargeGlass :goodsImg="goodsInfo.goods_img" :key="$route.fullPath" />
        <div class="product-property">
          <div class="property-hd">
            <div class="product-title">{{ goodsInfo.goodsname }}</div>
            <div class="product-des">{{ goodsInfo.description }}</div>
          </div>
          <div class="property-bd">
            <!-- 表单区域 -->
            <div class="probox">
              <div class="form-item">
                <label class="type">选择颜色</label>
                <el-radio-group v-model="formModel.color">
                  <el-radio
                    v-for="item in goodsInfo.color"
                    :label="item"
                    :key="item"
                    >{{ item }}</el-radio
                  >
                </el-radio-group>
              </div>
              <div class="form-item">
                <label class="type">选择型号</label>
                <el-radio-group v-model="formModel.edition">
                  <el-radio
                    v-for="item in goodsInfo.edition"
                    :label="item"
                    :key="item"
                    >{{ item }}</el-radio
                  >
                </el-radio-group>
              </div>
              <div class="form-item">
                <label class="type">选择数量</label>
                <span class="numBtn" @click="changeNum(-1)">-</span>
                <span class="goodsNum">{{ formModel.num }}</span>
                <span class="numBtn" @click="changeNum(1)">+</span>
              </div>
              <div class="form-item">
                <label class="type">商品价格</label>
                <div class="product-price">
                  &yen;
                  <span>{{
                    (goodsInfo.price * formModel.num).toFixed(2)
                  }}</span>
                </div>
              </div>
            </div>
            <div class="activity-box" v-if="goodsInfo.activity">
              <div class="activity">{{ goodsInfo.activity }}</div>
            </div>
            <button class="btn" @click="addCart">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
    <div class="product-info">
      <div class="infohd">产品详情</div>
      <div class="infobd">
        <div class="img-box" v-for="item in goodsInfo.goods_chart" :key="item">
          <img v-img-lazy="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  padding-top: 40px;
  background-color: #fff;
  .product {
    display: flex;
    .product-property {
      margin-left: 100px;
      .property-hd {
        .product-title {
          margin-bottom: 10px;
          color: #3a3a3a;
          font-size: 30px;
          font-weight: bold;
        }
        .product-des {
          margin-bottom: 20px;
          color: #666;
          font-size: 18px;
        }
      }
      .property-bd {
        .type {
          width: 56px;
          margin-right: 20px;
          font-size: 14px;
          line-height: 30px;
        }
        .form-item {
          display: flex;
          margin-bottom: 20px;
          &:last-of-type {
            margin-bottom: 0;
          }
          // 单选框
          ::v-deep(.el-radio) {
            margin-right: 10px;
          }
          ::v-deep(.el-radio__label) {
            min-width: 54px;
            height: 30px;
            padding: 0 12px;
            color: #666;
            line-height: 30px;
            text-align: center;
            outline: 1px solid #a4a4a4;
            border-radius: 2px;
            vertical-align: middle;
            cursor: pointer;
          }
          ::v-deep(.el-radio__input) {
            display: none;
          }
          ::v-deep(.el-radio__input.is-checked + .el-radio__label) {
            color: $gjwColor;
            outline: 2px solid $gjwColor;
          }
          // 输入栏
          .goodsNum {
            width: 50px;
            height: 30px;
            font-size: 16px;
            line-height: 26px;
            text-align: center;
            border: 2px solid #a4a4a4;
            border-left: none;
            border-right: none;
          }
          .numBtn {
            width: 30px;
            height: 30px;
            font-size: 20px;
            line-height: 26px;
            text-align: center;
            border: 2px solid #a4a4a4;
            cursor: pointer;
          }
        }
        .product-price {
          height: 30px;
          margin-bottom: 20px;
          color: crimson;
          font-size: 18px;
          line-height: 30px;
          span {
            font-size: 26px;
          }
        }
        .activity {
          width: 120px;
          margin-bottom: 20px;
          padding: 5px 10px;
          color: crimson;
          font-size: 14px;
          text-align: center;
          border: 2px solid crimson;
          border-radius: 5px;
          background-color: #fff;
        }
        .btn {
          width: 200px;
          height: 46px;
          padding: 0 10px;
          color: #fff;
          font-size: 18px;
          line-height: 46px;
          border: none;
          border-radius: 2px;
          text-align: center;
          background: crimson;
          cursor: pointer;
        }
      }
    }
  }
}
.product-info {
  text-align: center;
  .infohd {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>
