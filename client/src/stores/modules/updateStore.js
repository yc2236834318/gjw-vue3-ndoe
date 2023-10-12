// 用户信息修改仓库文件

import { defineStore } from 'pinia'
// 导入请求接口
import {
  userUpdateNickApi,
  userUpdatePswApi,
  userUpdateAvatarApi
} from '@/apis/user'

export const useUpdateStore = defineStore('update', () => {
  // 用户昵称修改
  const updateNickName = async (nickname) => {
    await userUpdateNickApi(nickname)
  }

  // 用户密码修改
  const updatePassWord = async (obj) => {
    await userUpdatePswApi(obj)
  }

  // 用户头像修改
  const updateAvatar = async (fd) => {
    await userUpdateAvatarApi(fd)
  }

  // 导出仓库对象
  return {
    updateNickName,
    updatePassWord,
    updateAvatar
  }
})
