<!-- 注册 子组件 -->

<script setup>
import { User, Lock } from '@element-plus/icons-vue' // 导入组件图标
import { myAlert } from '@/composables/myAlert' // 导入提示弹窗文件
import { useUserStore } from '@/stores' // 导入用户仓库文件
import { ref } from 'vue'

// ------ 数据收集模块 ------

// 表单数据
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
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
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,12}$/,
      message: '密码必须是 6-12位 的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断 重复密码框中的 value 和表单中的  password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致')) // 不一致则抛出错误
        } else {
          callback() // 一致也需要callback
        }
      },
      trigger: 'change'
    }
  ]
}

// ------ 注册模块 ------

const userStore = useUserStore() // 注册用户仓库
const emit = defineEmits(['changeVue']) // 子传父
const form = ref() // 绑定表单对象
const flag = ref(true) // 注册接口是否开启
// 注册函数
const submit = async () => {
  if (!flag.value) return myAlert('接口已关闭')
  await form.value.validate() // 表单对象数据验证
  await userStore.userReg(formModel.value) // 发起注册请求
  myAlert('注册成功')
  form.value.resetFields() // 重置表单
  emit('changeVue', true) // 切换到登录
}
</script>

<template>
  <div class="login-box">
    <div class="login_hd">用户注册</div>
    <div class="login_bd">
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        autocomplete="off"
        status-icon
      >
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
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="sub">
        <button @click="submit">注 册</button>
      </div>
      <div class="link">
        已有账号？去
        <span @click="emit('changeVue', true)">登录</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  width: 370px;
  height: 350px;
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
