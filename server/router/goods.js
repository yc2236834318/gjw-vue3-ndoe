// 商品路由接口文件

const express = require("express");
const router = express.Router(); // 路由对象

// 导入商品路由函数文件
const goods_handler = require("../router_handler/goods");

// 获取所有商品接口(按brand分组)
router.get("/getAllGoodsByBrand", goods_handler.getAllGoodsByBrand);

// 获取所有商品接口(按type分组)
router.get("/getAllGoodsByType", goods_handler.getAllGoodsByType);

// 获取banner商品接口(轮播图,推荐,横幅,品牌封面)
router.get("/getBanner/:code", goods_handler.getBanner);

// 根据ID获取商品接口
router.get("/getGoodsByID/:id", goods_handler.getGoodsByID);

// 筛选商品接口
router.post("/filterGoods", goods_handler.filterGoods);

// 获取热销单品接口
router.get("/getHot", goods_handler.gethot);

// 商品搜索接口
router.get("/searchGoods/:key?", goods_handler.searchGoods);

// 导出路由对象
module.exports = router;
