// 商品路由函数文件

// 导入数据库文件
const db = require("../db/index");

// 获取所有商品函数(按brand字段分组)
exports.getAllGoodsByBrand = (req, res) => {
  const sql = `SELECT brand, brandname, JSON_ARRAYAGG(JSON_OBJECT('id', id, 'goodsname', goodsname, 'price', price, 'goods_img', goods_img, 'description', description)) AS products FROM goods GROUP BY brand`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    if (results.length < 1) {
      return res.send({ code: 1, message: "未查询到商品信息" });
    }
    const data = results.map((row) => ({
      brand: row.brand,
      brandname: row.brandname,
      products: JSON.parse(row.products), // 解析 JSON 字符串为数组
    }));
    res.send({
      code: 0,
      message: "按品牌获取商品信息成功",
      data: data,
    });
  });
};

// 获取所有商品函数(按type字段分组)
exports.getAllGoodsByType = (req, res) => {
  const sql = `SELECT type, JSON_ARRAYAGG(JSON_OBJECT('id', id, 'goodsname', goodsname, 'price', price, 'goods_img', goods_img, 'description', description)) AS products FROM goods GROUP BY type`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    if (results.length < 1) {
      return res.send({ code: 1, message: "未查询到商品信息" });
    }
    const data = results.map((row) => ({
      type: row.type,
      products: JSON.parse(row.products), // 解析 JSON 字符串为数组
    }));
    res.send({
      code: 0,
      message: "按类型获取商品信息成功",
      data: data,
    });
  });
};

// 获取banner商品函数
exports.getBanner = (req, res) => {
  const sql = `select * from banner where codes=${req.params.code}`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败" });
    if (results.length < 1) {
      return res.send({ code: 1, message: "未查询到banner" });
    }
    res.send({
      code: 0,
      message: "获取banner成功",
      data: results,
    });
  });
};

// 根据商品ID获取商品函数
exports.getGoodsByID = (req, res) => {
  const sql = `select * from goods where id=${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    if (results.length < 1) {
      return res.send({ code: 1, message: "未查询到商品信息" });
    }
    res.send({
      code: 0,
      message: "获取商品信息成功",
      data: results,
    });
  });
};

// 商品筛选函数
exports.filterGoods = (req, res) => {
  // 1.条数查询
  const sql = `select count(*) as count from goods where brand like('${req.body.brand}') and type like('${req.body.type}') and price>${req.body.min} and price<${req.body.max}`;
  let count = 0;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    count = results[0];
    filterFun(req, res, count);
  });
};
function filterFun(req, res, count) {
  // 2.信息查询
  const sql = `select * from goods where brand like('${
    req.body.brand
  }') and type like('${req.body.type}') and price>${req.body.min} and price<${
    req.body.max
  } order by price ${req.body.order} limit ${
    (req.body.page - 1) * req.body.per_page
  },${req.body.per_page}`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    res.send({
      code: 0,
      message: "获取商品信息成功",
      count: count.count,
      data: results,
    });
  });
}

// 获取热销单品函数
exports.gethot = (req, res) => {
  const sql = `select * from goods where cost!='null' order by price asc limit 0,8`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    res.send({
      code: 0,
      message: "获取热销单品成功",
      data: results,
    });
  });
};

// 商品搜索函数
exports.searchGoods = (req, res) => {
  const key = req.params.key || "%";
  const sql = `select * from goods where goodsname like('%${key}%') or description like('%${key}%') or type like('%${key}%') or brand like('%${key}%') or typename like('%${key}%')`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    res.send({
      code: 0,
      message: "获取商品信息成功",
      data: results,
    });
  });
};
