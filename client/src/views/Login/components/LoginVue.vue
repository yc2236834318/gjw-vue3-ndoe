<!-- 登录 子组件 -->

<script setup>
import { View, Hide, User, Lock } from '@element-plus/icons-vue' // 导入组件图标
import { myAlert } from '@/composables/myAlert' // 导入提示弹窗文件
import { useUserStore } from '@/stores' // 导入用户仓库文件
import { useRouter } from 'vue-router' // 导入路由对象
import { ref } from 'vue'

// ------ 密码切换模块 ------

const router = useRouter() // 注册路由对象
const emit = defineEmits(['changeVue']) // 子传父
const view = ref(false) // 是否显示密码
const iptType = ref('password') // 密码框类型
// 切换密码框类型
const changeView = (flag) => {
  if (!flag) {
    view.value = true
    iptType.value = 'text'
  } else {
    view.value = false
    iptType.value = 'password'
  }
}

// ------ 数据收集模块 ------

const userStore = useUserStore() // 注册用户仓库
// 表单数据
const formModel = ref({
  username: userStore.userName || '', // 优先从用户仓库中获取记住的账号
  password: ''
})
// 数据验证
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 12, message: '用户名必须是 6-12位 的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,12}$/,
      message: '密码必须是 6-12位 的非空字符',
      trigger: 'blur'
    }
  ]
}

// ------ 登录模块 ------

const form = ref() // 绑定表单对象
const isDisabled = ref(false) // 是否禁用登录按钮
const remember = ref(false) // 是否记住账号
if (formModel.value.username) remember.value = true // 判断是否已记住账号

// 登录函数
const submit = async () => {
  await form.value.validate() // 表单对象数据验证
  await userStore.userLogin(formModel.value) // 发起登录请求
  myAlert('登录成功')
  if (remember.value) {
    // 若选中记住账号则将账号单独存入用户仓库
    userStore.setUserName(formModel.value.username)
  } else {
    // 若未选中记住账号则清除用户仓库中单独存放的账号
    userStore.setUserName('')
  }
  form.value.resetFields() // 重置表单
  isDisabled.value = true // 禁用登录按钮
  setTimeout(() => {
    router.replace({ path: '/' }) // 0.5秒后跳转到首页
  }, 500)
}
</script>

<template>
  <div class="login-box">
    <div class="login_hd">用户登录</div>
    <div class="login_bd">
      <el-form :model="formModel" :rules="rules" ref="form">
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            :type="iptType"
            placeholder="请输入密码"
          >
          </el-input>
          <el-icon>
            <Hide v-if="view" @click="changeView(true)" />
            <View v-else @click="changeView(false)" />
          </el-icon>
        </el-form-item>
        <p class="remember">
          <el-checkbox v-model="remember" label="记住账号" />
        </p>
      </el-form>
      <div class="sub">
        <button @click="submit" :disabled="isDisabled">登 录</button>
      </div>
      <div class="link">
        没有账号？去
        <span @click="emit('changeVue', false)">注册</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  width: 370px;
  height: 330px;
  padding: 34px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  .login_hd {
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }
  .login_bd {
    .el-form {
      :deep(.el-form-item__content) {
        position: relative;
        .el-input {
          .el-input__wrapper {
            font-size: 12px;
            width: 300px;
            height: 36px;
            text-indent: 10px;
            border-radius: 2px;
            color: #333;
            .el-input__inner::placeholder {
              color: #999;
            }
          }
        }
      }
      .el-icon {
        position: absolute;
        top: 8px;
        right: 10px;
        color: #999;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .sub {
      text-align: center;
      button {
        width: 200px;
        height: 35px;
        margin-top: 10px;
        color: #fff;
        border: none;
        background-color: $gjwColor;
        cursor: pointer;
      }
    }
    .remember {
      text-align: center;
      .el-checkbox {
        :deep(.el-checkbox__label) {
          font-size: 12px;
        }
        :deep(.el-checkbox__inner) {
          width: 15px;
          height: 15px;
        }
      }
    }
    .link {
      width: 100%;
      padding-top: 20px;
      font-size: 12px;
      text-align: center;
      span {
        display: inline-block;
        color: $gjwColor;
        cursor: pointer;
      }
    }
  }
}
</style>
