<!-- 登录页 一级路由 -->

<script setup>
import LoginVue from '@/views/Login/components/LoginVue.vue'
import RegisterVue from '@/views/Login/components/RegisterVue.vue'
import { ref } from 'vue'

const isLogin = ref(true) // 登录/注册
// 切换登录/注册
const changeLogin = (flag) => {
  isLogin.value = flag
}
</script>

<template>
  <div class="login">
    <div class="layout">
      <div class="logo">
        <RouterLink to="/">
          <div class="logo-box">
            <img src="/images/logo.png" alt="" />
          </div>
          <h3>购 机 网</h3>
        </RouterLink>
      </div>
      <div class="login-container">
        <div class="login-img">
          <img src="/images/gjw.png" alt="" />
        </div>
        <LoginVue v-if="isLogin" @changeVue="changeLogin" />
        <RegisterVue v-else @changeVue="changeLogin" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  background-color: #fff;
}
.logo {
  width: 60px;
  padding-top: 20px;
  .logo-box {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
    }
  }
  h3 {
    width: 60px;
    height: 30px;
    color: #f83244;
    line-height: 30px;
    text-align: center;
  }
}
.login-container {
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 522px;
  margin: 0 auto;
  margin-top: 80px;
  .login-img {
    width: 408px;
    height: 300px;
    img {
      width: 100%;
    }
  }
}
</style>
