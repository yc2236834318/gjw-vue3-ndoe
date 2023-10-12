// 用户信息路由接口文件

const express = require("express");
const path = require("path");
const router = express.Router(); // 路由对象

// 导入用户信息路由函数文件
const userinfo_handler = require("../router_handler/userinfo");

// 导入数据验证模块
const expressJoi = require("@escook/express-joi");
// 导入验证规则对象(schema/user)
const { update_nickname_schema } = require("../schema/user");
const { update_password_schema } = require("../schema/user");

// 文件上传
// 1.导入multer模块
const multer = require("multer");
// 2.配置文件名和存放路径
const storage = multer.diskStorage({
  // 路径设置
  destination: function (req, file, cb) {
    // cb(null, "../client/public/avatar"); // 打包前使用
    cb(null, "../client/dist/public/avatar"); // 打包后使用
  },
  // 文件名设置(防止重名):上传时间戳+文件扩展名
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// 3.文件过滤器函数
const fileFilter = (req, file, cb) => {
  // 允许的文件类型数组
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    // 文件类型合法
    cb(null, true);
  } else {
    // 文件类型不合法
    cb(new Error("图片格式必须为jpeg,jpg,png"), false);
  }
};
// 4.实例化multer对象
const uploadAvatar = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("userAvatar");
// .single("文件名"):支持一次上传一个文件
// 注意 该处的文件名要与客户端请求提交的文件名一致(userAvatar)

// 获取用户信息接口
router.get("/userinfo", userinfo_handler.getUserInfo);

// 修改用户昵称接口(有数据验证)
router.post(
  "/update/nickname",
  expressJoi(update_nickname_schema),
  userinfo_handler.updateNickName
);

// 修改用户密码接口(有数据验证)
router.post(
  "/update/password",
  expressJoi(update_password_schema),
  userinfo_handler.updatePassword
);

// 修改用户头像接口(挂载multer对象)
router.post("/update/avatar", uploadAvatar, userinfo_handler.updateAvatar);

// 导入路由对象
module.exports = router;
