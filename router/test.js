const express = require("express");
const { User } = require("../modules/user");
const router = express.Router();
//  增加
router.get("/add", (req, res) => {
  console.log(req.query);
  let Username = req.query.name;
  const user = new User({
    name: Username || "爱是一切",
    author: "12345",
    isPubliched: false,
  });
  // 保存到数据库
  user
    .save()
    .then((rej) => {
      console.log(rej);
      res.send({
        status: 0,
        msg: "创建成功！",
      });
    })
    .catch((err) => {
      console.log(2);
      res.send({
        status: 444,
        msg: "创建失败！",
      });
    });
});
// 查
// findOne() 根据条件查询文档，只返回一条数据,条件若为空则默认返回集合中的第一条文档
// find()全部
router.get("/select", (req, res) => {
  // 保存到数据库
  console.log(req.query);
  let Username = req.query.name;
  User.find() //查询条件工具参数改变
    .then((rej) => {
      console.log(rej);
      res.send({
        status: 0,
        msg: "查看成功！",
        data: rej,
      });
    })
    .catch((err) => {
      res.send({
        msg: "查看失败！",
      });
    });
});
// 删
// findOneAndDelete({}) 删除单个文档,条件若是为空，默认删除第一条，删除成功返回被删除的数据，删除失败返回null
// deleteMany({})删除多个，条件为空，默认删除全部文档。删除成功后返回一个对象{ acknowledged: true, deletedCount: 4 }"acknowledged"表示删除成功否，"deletedCount"表示删除的条数
// users.findOneAndDelete({ _id: "6242fdea62e4817b23769cd1" }).then((res) => {
//   console.log(res);
// });
router.get("/Del", (req, res) => {
  User.findOneAndDelete()
    .then((rej) => {
      console.log(rej);
      res.send({
        status: 0,
        msg: "删除成功！",
        data: rej,
      });
    })
    .catch((err) => {
      res.send({
        msg: "删除失败！",
      });
    });
});

// 改
// updateOne({查询条件},{要修改的值}) 修改单条数据，返回一个对象
// users.updateOne({name:"张三"},{name:"狗蛋"}).then(res => {
//     console.log(res)
// })
// updateMany({查询条件},{要修改的值}) 修改多条，返回一个对象
// users.updateMany({},{age:60}).then(res => {
//     console.log(res)
// })
router.get("/set", (req, res) => {
  User.updateOne({ name: "爱是一切" }, { name: "p是一切" })
    .then((rej) => {
      console.log(rej);
      res.send({
        status: 0,
        msg: "修改成功！",
        data: rej,
      });
    })
    .catch((err) => {
      res.send({
        msg: "修改失败！",
      });
    });
});
// 将路由对象共享出去
module.exports = router;
