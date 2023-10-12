// 用户仓库文件

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userLoginApi, userGetInfoApi, userRegisterApi } from '@/apis/user' // 导入请求接口

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref({}) // 用户数据
    const token = ref('') // 用户令牌

    // 用户登录模块
    const userLogin = async (obj) => {
      const res = await userLoginApi(obj) // 发起登录请求
      userInfo.value = res.data.data // 存放用户信息
      token.value = res.data.token // 存放令牌信息
    }

    // 用户注册模块
    const userReg = async (obj) => {
      await userRegisterApi(obj) // 发起注册请求
    }

    // 用户信息模块
    const getUser = async () => {
      const res = await userGetInfoApi() // 发起请求获取数据
      userInfo.value = res.data.data
    }
    const setUser = (obj) => {
      userInfo.value = obj // 设置用户信息
    }
    const removeToken = () => {
      token.value = '' // 移除用户令牌
    }

    // 记住账号模块
    const userName = ref('')
    const setUserName = (value) => {
      userName.value = value
    }

    // 导出仓库对象
    return {
      userInfo,
      userLogin,
      userReg,
      getUser,
      setUser,
      token,
      removeToken,
      userName,
      setUserName
    }
  },
  {
    persist: {
      key: 'gjwUserInfo' // 开启持久化
    }
  }
)
