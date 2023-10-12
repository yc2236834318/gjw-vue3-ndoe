// 登录注册路由接口文件

const express = require("express");
const router = express.Router(); // 路由对象

// 导入登录注册路由函数文件
const user_handler = require("../router_handler/user");
// 导入数据验证模块(安装命令 npm i @escook/express-joi)
const expressJoi = require("@escook/express-joi");
// 导入验证规则对象(schema/user)
const { reg_login_schema } = require("../schema/user");

// 注册接口(有数据验证)
router.post("/reguser", expressJoi(reg_login_schema), user_handler.regUser);

// 登录接口
router.post("/login", user_handler.login);

// 导出路由对象
module.exports = router;
