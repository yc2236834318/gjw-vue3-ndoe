// 订单路由接口文件

const express = require("express");
const router = express.Router(); // 路由对象

// 导入用户信息路由函数文件
const order_handler = require("../router_handler/order");

// 获取用户全部订单
router.get("/getAllOrder", order_handler.getAllOrder);

// 根据订单ID获取订单
router.get("/getOrderById",order_handler.getOrderById)

// 创建用户订单
router.post("/addOrder",order_handler.addOrder)

// 删除用户订单
router.post("/delOrder",order_handler.updateOrder)

// 支付订单
router.post("/payOrder",order_handler.payOrder)

// 导入路由对象
module.exports = router;
