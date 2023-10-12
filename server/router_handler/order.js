// 订单路由函数文件

// 导入数据库文件
const db = require("../db/index");

// 获取用户全部订单
exports.getAllOrder = (req, res) => {
  // 定义查询语句
  const sql = `SELECT * FROM orders WHERE uid = ${req.auth.id} AND isDelete = 0`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    res.send({
      code: 0,
      message: "获取订单信息成功",
      data: results,
    });
  });
};

// 根据订单ID获取订单
exports.getOrderById = (req, res) => {
  // 定义查询语句
  const sql = `SELECT * FROM orders WHERE uid=${req.auth.id} AND id=${req.query.oid} AND isDelete=0`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    res.send({
      code: 0,
      message: "获取订单信息成功",
      data: results,
    });
  });
};

// 创建用户订单
exports.addOrder = (req, res) => {
  const goodsList = JSON.parse(req.body.goods_list);
  const sql = `insert into orders(uid,total_num,total_price,area,address,consignee,phone,pay_method,creat_date,goods_list) values(${
    req.auth.id
  },"${req.body.total_num}","${req.body.total_price}","${req.body.area}","${
    req.body.address
  }","${req.body.consignee}","${req.body.phone}","${req.body.pay_method}","${
    req.body.creat_date
  }",'${JSON.stringify(goodsList)}')`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    if (results.affectedRows !== 1) {
      return res.send({ code: 1, message: "订单创建失败" });
    }
    // 查询订单的详细信息
    const orderId = results.insertId;
    const getOrderSql = `SELECT * FROM orders WHERE id = ${orderId}`;
    db.query(getOrderSql, (getOrderErr, getOrderResults) => {
      if (getOrderErr) {
        return res.send({
          code: 1,
          message: "获取订单信息失败",
          err: getOrderErr,
        });
      }
      if (getOrderResults.length !== 1) {
        return res.send({ code: 1, message: "未找到订单信息" });
      }
      const orderInfo = getOrderResults[0];
      // 在成功创建订单后，删除购物车中的商品
      const deleteCartItemSql = `DELETE FROM cart_item WHERE id IN (${goodsList
        .map((item) => item.id)
        .join(",")})`;
      db.query(deleteCartItemSql, (deleteErr, deleteResult) => {
        if (deleteErr) {
          return res.send({
            code: 1,
            message: "删除购物车商品失败",
            err: deleteErr,
          });
        }
        res.send({
          code: 0,
          message: "创建订单成功",
          data: orderInfo,
        });
      });
    });
  });
};

// 删除用户订单
exports.updateOrder = (req, res) => {
  const sql = `UPDATE orders SET isDelete=1 WHERE id=${req.body.oid}`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    if (results.affectedRows !== 1) {
      return res.send({ code: 1, message: "删除订单失败" });
    }
    res.send({ code: 0, message: "删除订单成功" });
  });
};

// 余额支付
exports.payOrder = (req, res) => {
  const userId = req.auth.id; // 用户ID
  const orderId = req.body.oid; // 订单ID
  // 查询用户的余额
  const getUserBalanceSql = `SELECT balance FROM users WHERE id = ?`;
  db.query(getUserBalanceSql, [userId], (userErr, userResults) => {
    if (userErr) {
      return res.send({ code: 1, message: "数据库操作失败", err: userErr });
    }
    if (userResults.length !== 1) {
      return res.send({ code: 1, message: "未找到用户信息" });
    }
    const userBalance = userResults[0].balance; // 用户余额
    // 查询订单的总价格
    const getOrderTotalPriceSql = `SELECT total_price FROM orders WHERE id = ?`;
    db.query(getOrderTotalPriceSql, [orderId], (orderErr, orderResults) => {
      if (orderErr) {
        return res.send({ code: 1, message: "数据库操作失败", err: orderErr });
      }
      if (orderResults.length !== 1) {
        return res.send({ code: 1, message: "未找到订单信息" });
      }
      const orderTotalPrice = orderResults[0].total_price; // 订单总价格

      if (userBalance < orderTotalPrice) {
        return res.send({ code: 1, message: "余额不足" });
      }
      // 计算新余额
      const newBalance = userBalance - orderTotalPrice;
      // 更新用户的余额
      const updateUserBalanceSql = `UPDATE users SET balance = ? WHERE id = ?`;
      db.query(
        updateUserBalanceSql,
        [newBalance, userId],
        (updateErr, updateResults) => {
          if (updateErr) {
            return res.send({
              code: 1,
              message: "数据库操作失败",
              err: updateErr,
            });
          }
          if (updateResults.affectedRows !== 1) {
            return res.send({ code: 1, message: "更新用户余额失败" });
          }
          // 更新订单的支付方式为余额支付
          const updateOrderPayMethodSql = `UPDATE orders SET pay_method = '余额支付' WHERE id = ?`;
          db.query(
            updateOrderPayMethodSql,
            [orderId],
            (updatePayMethodErr, updatePayMethodResults) => {
              if (updatePayMethodErr) {
                return res.send({
                  code: 1,
                  message: "更新订单支付方式失败",
                  err: updatePayMethodErr,
                });
              }
              if (updatePayMethodResults.affectedRows !== 1) {
                return res.send({
                  code: 1,
                  message: "更新订单支付方式失败",
                });
              }
              res.send({ code: 0, message: "支付成功" });
            }
          );
        }
      );
    });
  });
};
