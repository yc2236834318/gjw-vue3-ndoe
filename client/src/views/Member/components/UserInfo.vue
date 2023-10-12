<!-- 用户信息页 三级路由 -->

<script setup>
import UpdateDialog from '@/views/Member/components/components/UpdateDialog.vue'
import AddDialog from '@/views/Member/components/components/AddDialog.vue'
import { myAlert } from '@/composables/myAlert'
// 导入仓库文件
import {
  useUserStore,
  useCartStore,
  useReceStore,
  useOrderStore,
  useUpdateStore
} from '@/stores'
import { useRouter } from 'vue-router' // 导入路由对象
import { ref } from 'vue'

const router = useRouter() // 注册路由对象
const userStore = useUserStore() // 注册用户仓库
const cartStore = useCartStore() // 注册购物车仓库
const receStore = useReceStore() // 注册收货仓库
const orderStore = useOrderStore() // 注册订单仓库
const updateStore = useUpdateStore() // 注册信息修改仓库
const subIndex = ref(1) // 栏目序号
const nickForm = ref() // 昵称表单
const psdForm = ref() // 密码表单

// 栏目切换
const cutSub = (value) => {
  subIndex.value = value
  formModel.value = { ...defaultModel.value } // 重置表单数据
}
// 表单默认数据
const defaultModel = ref({
  nickname: '',
  oldPassword: '',
  newPassword: ''
})
// 表单数据
const formModel = ref({ ...defaultModel.value })
// 验证规则
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 12, message: '昵称为 2到12个字符 之间', trigger: 'blur' }
  ],
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    {
      pattern: /^\S{6,12}$/,
      message: '密码必须是 6-12位 的非空字符',
      trigger: 'blur'
    }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,12}$/,
      message: '密码必须是 6-12位 的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断 重复旧密码和新密码是否一致
        if (value === formModel.value.oldPassword) {
          callback(new Error('新旧密码不能相同')) // 一致则抛出错误
        } else {
          callback() // 不一致也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

// 昵称修改
const updateNick = async () => {
  await nickForm.value.validate() // 表单对象数据验证
  await updateStore.updateNickName(formModel.value.nickname) // 发起修改请求
  myAlert('修改成功')
  nickForm.value.resetFields() // 重置表单
  userStore.getUser() // 重新获取用户信息
}

// 密码修改
const updatePsd = async () => {
  await psdForm.value.validate() // 表单对象数据验证
  await updateStore.updatePassWord(formModel.value) // 发起修改请求
  psdForm.value.resetFields() // 重置表单
  myAlert('修改成功,请重新登录')
  userStore.removeToken() // 清除pinia中的token
  userStore.setUser({}) // 清除pinia中的用户信息
  cartStore.clearCart() // 清除pinia中的购物车信息
  receStore.clearRece() // 清除pinia中的用户收货信息
  orderStore.clearOrder() // 清除pinia中的订单信息
  router.replace('/login') // 跳转到登录页
}

// 头像修改
const flag = ref(true) // 头像修改接口是否开启
const isDisabled = ref(true) // 是否禁用修改按钮
const imgUrl = ref() // 用户头像
if (userStore.userInfo.user_pic) {
  imgUrl.value = userStore.userInfo.user_pic // 获取用户头像
}
const formData = new FormData() // 创建FormData对象(用于上传图片)
// 文件改变函数
const onChangeFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) // 头像回显
  isDisabled.value = false // 启用修改按钮
  formData.delete('userAvatar') // 清空formData
  formData.append('userAvatar', uploadFile.raw, uploadFile.name) // 将图片加入formData
  // 注意 该处的变量名要与服务器接口的文件名一致(userAvatar)
}
// 头像上传函数
const onUpload = async () => {
  if (!flag.value) return myAlert('接口已关闭')
  await updateStore.updateAvatar(formData) // 请求上传头像
  await userStore.getUser() // 重新获取用户信息
  myAlert('修改成功')
}

// 删除地址
const delRece = (id) => {
  ElMessageBox.confirm('确定删除地址？', '温馨提示', {
    type: 'Warning',
    showClose: false,
    lockScroll: false,
    closeOnClickModal: false,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await receStore.deleteRece(id) // 发起删除请求
      receStore.getReceList() // 重新获取收货信息
      myAlert('删除成功')
    })
    .catch(() => {})
}
</script>

<template>
  <div class="home-overview">
    <div class="user-meta">
      <div class="avatar">
        <img
          v-if="userStore.userInfo?.user_pic"
          :src="userStore.userInfo?.user_pic"
        />
        <img v-else src="/images/face.png" alt="" />
      </div>
      <h4>{{ userStore.userInfo?.nickname }}</h4>
    </div>
    <div class="balance">
      <p>
        余额 : <span>&yen; {{ userStore.userInfo?.balance }}</span>
      </p>
    </div>
  </div>
  <div class="user-info">
    <div class="sub">
      <div class="tit" @click="cutSub(1)" :class="{ active: subIndex === 1 }">
        修改昵称
      </div>
      <div class="tit" @click="cutSub(2)" :class="{ active: subIndex === 2 }">
        修改密码
      </div>
      <div class="tit" @click="cutSub(3)" :class="{ active: subIndex === 3 }">
        修改头像
      </div>
      <div class="tit" @click="cutSub(4)" :class="{ active: subIndex === 4 }">
        修改地址
      </div>
    </div>
    <div class="content">
      <div class="item" v-if="subIndex === 1">
        <p>
          <span class="tit">昵称修改</span>
        </p>
        <p>
          <el-form :model="formModel" :rules="rules" ref="nickForm">
            <el-form-item prop="nickname">
              <el-input
                v-model="formModel.nickname"
                style="width: 300px; margin-right: 20px"
                placeholder="请输入昵称"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="updateNick" type="primary">修改</el-button>
            </el-form-item>
          </el-form>
        </p>
      </div>
      <div class="item" v-else-if="subIndex === 2">
        <p>
          <span class="tit">密码修改</span>
        </p>
        <p>
          <el-form :model="formModel" :rules="rules" ref="psdForm">
            <el-form-item prop="oldPassword">
              <el-input
                v-model="formModel.oldPassword"
                type="password"
                style="width: 300px; margin-right: 20px"
                placeholder="请输入旧密码"
              />
            </el-form-item>
            <el-form-item prop="newPassword">
              <el-input
                v-model="formModel.newPassword"
                type="password"
                style="width: 300px; margin-right: 20px"
                placeholder="请输入新密码"
              />
            </el-form-item>
            <el-button @click="updatePsd" type="primary">修改</el-button>
          </el-form>
        </p>
      </div>
      <div class="item" v-else-if="subIndex === 3">
        <p>
          <span class="tit">头像修改</span>
        </p>
        <p>
          <!-- el-upload 文件上传组件 -->
          <!-- 确保 name 属性与后端接受的字段名一致(userAvatar) -->
          <el-upload
            class="avatar-uploader"
            name="userAvatar"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="onChangeFile"
            accept="image/jpeg,image/jpg,image/png"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <img v-else src="/images/face.png" width="278" />
          </el-upload>
          <br />
          <el-button
            @click="onUpload"
            :disabled="isDisabled"
            type="primary"
            size="large"
          >
            上传头像
          </el-button>
        </p>
      </div>
      <div class="item" v-if="subIndex === 4">
        <p>
          <span class="tit">收货地址修改</span>
        </p>
        <div class="rece">
          <div v-if="receStore.receList.length < 1" class="empty">
            暂无地址，去添加吧！
          </div>
          <div v-else class="addressWrapper">
            <div
              class="receItem"
              v-for="item in receStore.receList"
              :key="item.id"
            >
              <ul>
                <li>
                  <span>收<i />货<i />人：</span>{{ item.consignee }}
                </li>
                <li><span>联系方式：</span>{{ item.phone }}</li>
                <li><span>收货地址：</span>{{ item.area + item.address }}</li>
              </ul>
              <div class="btn">
                <UpdateDialog :receInfo="item" />
                <el-button @click="delRece(item.id)" type="danger">
                  删除
                </el-button>
              </div>
            </div>
          </div>
          <!-- 添加地址 子组件 -->
          <AddDialog class="addRece" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-overview {
  height: 132px;
  background: url(/images/center-bg.png) no-repeat center / cover;
  display: flex;
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;
    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }
  .balance {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      color: #fff;
      font-size: 18px;
      line-height: 32px;
      span {
        color: #fff;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
.user-info {
  display: flex;
  min-height: 442px;
  .active {
    color: #fff !important;
    background-color: $gjwColor;
  }
  .sub {
    flex: 1;
    border: 10px solid #2caa8f;
    border-top: 0;
    .tit {
      width: 100%;
      height: 60px;
      color: $gjwColor;
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      text-align: center;
      border-bottom: 6px solid #2caa8f;
      cursor: pointer;
    }
  }
  .content {
    flex: 4;
    border: 10px solid #2caa8f;
    border-top: 0;
    border-left: 0;
    .item {
      width: 80%;
      margin: 0 auto;
      padding-top: 30px;
      text-align: center;
      p {
        margin-top: 30px;
        font-size: 16px;
      }
      .tit {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
.el-form {
  :deep(.el-form-item__content) {
    justify-content: center;
  }
  :deep(.el-form-item__error) {
    left: 24%;
  }
}
.avatar-uploader {
  img {
    background-color: transparent;
  }
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      width: 200px;
      height: 200px;
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
// 收货地址
.rece {
  .empty {
    width: 100%;
    margin-top: 80px;
    font-size: 18px;
    font-weight: bold;
  }
  .receItem {
    position: relative;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    text-align: left;
    border: 2px solid $gjwColor;
    .btn {
      position: absolute;
      top: 20px;
      right: 10px;
      display: flex;
      button {
        margin-left: 10px;
      }
    }
  }
  .addRece {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
