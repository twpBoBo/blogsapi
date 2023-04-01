const express = require("express");
// Token配置
const jwt = require("jsonwebtoken");
const { User } = require("../modules/user");
const { TIME, TOKEN_KEY } = require("../config");
// 图片上传
const multer = require("multer");
const fs = require("fs");
const path = require("path");
// 创建路由对象
const router = express.Router();

// 注册新用户
router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name || "",
    zhanghao: req.body.zhanghao._value,
    paswd: req.body.paswd._value,
    head: "",
    isPubliched: true,
  });
  // 保存到数据库
  console.log(req.body.zhanghao._value);
  let userinfo = await User.findOne({ zhanghao: req.body.zhanghao._value }); //判断账号是否存在
  console.log(userinfo);
  if (userinfo == null) {
    user
      .save()
      .then((rej) => {
        console.log(rej);
        res.send({
          status: 0,
          msg: "注册成功！",
          type: "#8dc149",
        });
      })
      .catch((err) => {
        console.log(2);
        res.send({
          status: 444,
          msg: "注册失败！",
        });
      });
  } else {
    res.send({
      status: 3,
      msg: "账号已存在！",
      type: "red",
    });
  }
});

// 登录
router.post("/login", async (req, res) => {
  const body = req.body;
  let zhanghao = body.zhanghao;
  let paswd = body.paswd;
  let userinfo = await User.findOne({ zhanghao }); //判断用户和密码是否存在
  console.log(userinfo);
  let usermima = await User.findOne({ paswd }); //密码是否存在{ paswd }
  let token = jwt.sign({ paswd, zhanghao }, TOKEN_KEY, { expiresIn: TIME });
  if (userinfo !== null && usermima !== null) {
    res.send({
      status: 0,
      msg: "登陆成功！",
      token: "Bearer " + token, //这里设置了前端就不用设置了
      id: usermima._id,
      type: "#8dc149",
    });
  } else if (userinfo == null) {
    res.send({
      status: 1,
      msg: "账号不存在！",
      type: "red",
    });
  } else if (usermima == null) {
    res.send({
      status: 2,
      msg: "密码错误",
      type: "red",
    });
  }
});

// 获取基本信息接口
router.post("/info", async (req, res) => {
  let _id = req.body.id;
  console.log(_id);
  let info = await User.findOne({ _id });
  res.send({
    status: 0,
    name: info.name || "用户xxx",
    head: info.head,
  });
});
// 修改头像;
// // 生成的图片放入uploads文件夹下;
// let upload = multer({ dest: "uploads/" });
// router.get("/head", upload.single("test"), function (req, res, next) {
//   console.log(1);
//   console.log(req.body);
//   let _id = req.body.data;
//   //读取文件路径(uploads/文件夹下面的新建的图片地址)
//   fs.readFile(req.file.path, (err, data) => {
//     //如果读取失败
//     if (err) {
//       return res.send("上传失败");
//     }
//     //如果读取成功
//     //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
//     let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
//     //拓展名
//     let extname = req.file.mimetype.split("/")[1];
//     console.log(extname);
//     //拼接成图片名
//     let keepname = time + "." + extname;
//     //三个参数
//     //1.图片的绝对路径
//     //2.写入的内容
//     //3.回调函数
//     // console.log(path.join(__dirname, "../public/img/"));
//     fs.writeFile(path.join(__dirname, "../public/img/" + keepname), data, (err) => {
//       if (err) {
//         return res.send("写入失败");
//       }
//       res.send({ err: 0, msg: "上传ok", data: "../public/img/" + keepname });

//       // 写入数据库
//       // User.updateOne({ _id }, { head: "http://192.168.2.12:8099/img/" + keepname })
//       //   .then((rej) => {
//       //     res.send({
//       //       status: 0,
//       //       msg: "修改成功！",
//       //       data: rej,
//       //     });
//       //   })
//       //   .catch((err) => {
//       //     res.send({
//       //       msg: "修改失败！",
//       //     });
//       //   });
//     });
//   });
// });
// 修改名称
router.post("/newname", async (req, res) => {
  let _id = req.body.id;
  console.log(req.body.name);
  console.log(_id);
  User.updateOne({ _id }, { name: req.body.name })
    .then((rej) => {
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
router.get("/test", async (req, res) => {
  res.send({
    data: "twp",
  });
});

// 将路由对象共享出去
module.exports = router;
