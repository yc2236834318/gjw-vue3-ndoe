// 请求配置文件

import axios from 'axios'
import { useUserStore } from '@/stores/index' // 导入用户仓库
import { myAlert } from '@/composables/myAlert' // 导入提示弹窗文件
import router from '@/router/index' // 导入路由对象

const baseURL = 'http://127.0.0.1' // 项目基地址

const instance = axios.create({
  baseURL: baseURL, // 项目基地址
  timeout: 5000 // 超时时间(5秒)
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const useStore = useUserStore() // 注册用户仓库实例
    const token = useStore.token // 用户令牌
    if (token) config.headers.Authorization = token // 若令牌存在则挂载到请求头上
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 成功接收到响应
    // 1.返回代码为请求成功
    if (res.data.code === 0) return res // 返回响应体
    // 2.返回代码为请求失败
    // (1)401错误(权限不足跳转到登录页)
    if (res.data.status === 401) {
      const useStore = useUserStore() // 注册用户仓库实例
      useStore.setUser({}) // 清除用户数据
      useStore.removeToken() // 清空用户令牌
      myAlert('无效的令牌,请重新登录')
      return router.push('/login') // 跳转到登录页
    }
    // (2)其他错误
    myAlert(res.data.message || '服务异常') // 弹出提示信息
    return Promise.reject(res.data) // 抛出错误
  },
  (err) => {
    // 未接收到响应
    myAlert(err.response.data.message || '服务异常') // 弹出提示信息
    return Promise.reject(err) // 抛出错误
  }
)

export default instance // 导出请求配置对象
export { baseURL } // 导出基地址
