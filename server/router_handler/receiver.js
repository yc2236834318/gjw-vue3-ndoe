// 用户收货信息路由函数文件

// 导入数据库文件
const db = require("../db/index");

// 获取用户收货信息函数
exports.getReceiver = (req, res) => {
  // 定义查询语句
  const sql = "select * from receiver where uid=?";
  db.query(sql, req.auth.id, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    res.send({
      code: 0,
      message: "获取用户收货信息成功",
      data: results,
    });
  });
};

// 添加用户收货信息
exports.addReceiver = (req, res) => {
  const sql = `insert into receiver(uid,area,address,phone,consignee) values(${req.auth.id},"${req.body.area}","${req.body.address}","${req.body.phone}","${req.body.consignee}")`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    if (results.affectedRows !== 1) {
      return res.send({ code: 1, message: "添加信息失败" });
    }
    res.send({ code: 0, message: "添加信息成功" });
  });
};

// 修改用户收货信息
exports.updateReceiver = (req, res) => {
  const sql = `update receiver set area='${req.body.area}', address='${req.body.address}', phone='${req.body.phone}', consignee='${req.body.consignee}' where id=${req.body.id}`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    if (results.affectedRows !== 1) {
      return res.send({ code: 1, message: "修改信息失败" });
    }
    res.send({ code: 0, message: "修改信息成功" });
  });
};

// 删除用户收货信息
exports.deleteReceiver = (req, res) => {
  const sql = `DELETE FROM receiver WHERE id=${req.body.id}`;
  db.query(sql, (err, results) => {
    if (err) return res.send({ code: 1, message: "数据库操作失败", err });
    if (results.affectedRows !== 1) {
      return res.send({ code: 1, message: "删除信息失败" });
    }
    res.send({ code: 0, message: "删除信息成功" });
  });
};
