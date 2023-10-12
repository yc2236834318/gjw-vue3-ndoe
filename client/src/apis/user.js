// 用户相关请求接口文件

import request from '@/utils/request' // 导入请求配置文件

// 注册请求
export const userRegisterApi = (obj) => {
  return request.post('/api/reguser', {
    username: obj.username,
    password: obj.password,
    repassword: obj.repassword
  })
}

// 登录请求
export const userLoginApi = (obj) => {
  return request.post('/api/login', {
    username: obj.username,
    password: obj.password
  })
}

// 获取用户信息
export const userGetInfoApi = () => {
  return request.get('/my/userinfo')
}

// 修改用户昵称
export const userUpdateNickApi = (nickname) => {
  return request.post('/my/update/nickname', {
    nickname: nickname
  })
}

// 修改用户密码
export const userUpdatePswApi = (obj) => {
  return request.post('/my/update/password', {
    oldPsw: obj.oldPassword,
    newPsw: obj.newPassword
  })
}

// 修改用户头像
export const userUpdateAvatarApi = (fd) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return request.post('/my/update/avatar', fd, config)
}
