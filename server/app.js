// 服务器文件

// 启动服务器
// 在app.js下打开终端 nodemon app.js

const express = require("express");
const cors = require("cors");
const app = express();
// 调用内置中间件用于识别body中的请求体数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 导入数据验证模块
const joi = require("joi");
// 创建静态资源服务器
app.use("/public", express.static("./public"));

// cors跨域
app.use(
  cors({
    origin: ["http://localhost:5173","http://127.0.0.1:5500"], // 允许跨域的域名
    methods: ["GET", "POST", "HEAD", "DELETE", "PUT"], // 允许跨域的方式
  })
);

// 令牌解析配置
const { expressjwt } = require("express-jwt");
const config = require("./config");
app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api/, /^\/goods/],
    // path 无需解析令牌的接口(游客可访问,但不解析就没有req.auth)
  })
);

// 导入登录注册路由模块
const userRouter = require("./router/user");
// 注册为全局模块并加上访问前缀:api
app.use("/api", userRouter);

// 导入用户信息路由模块
const userinfoRouter = require("./router/userinfo");
// 注册为全局模块并加上访问前缀:my
app.use("/my", userinfoRouter);

// 导入用户收货信息路由模块
const receiverRouter = require("./router/receiver");
// 注册为全局模块并加上访问前缀:receiver
app.use("/receiver", receiverRouter);

// 导入商品路由模块
const goodsRouter = require("./router/goods");
// 注册为全局模块并加上访问前缀:goods
app.use("/goods", goodsRouter);

// 导入购物车路由模块
const cartRouter = require("./router/cart");
// 注册为全局模块并加上访问前缀:cart
app.use("/cart", cartRouter);

// 导入订单路由模块
const orderRouter = require("./router/order");
// 注册为全局模块并加上访问前缀:order
app.use("/order", orderRouter);

// 定义错误级中间件,捕获项目错误
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    // 数据验证不通过
    return res.send({ status: 1, message: "数据验证失败 " + err.message });
  }
  if (err.name === "UnauthorizedError") {
    // 无效的令牌
    return res.send({ status: 401, message: "无效的token,请重新登录" });
  }
  console.error(err);
  res.status(500).send({ status: 1, message: "未知的错误", error: err });
});
app.listen(80, () => {
  console.log("服务器启动成功 127.0.0.1");
});
