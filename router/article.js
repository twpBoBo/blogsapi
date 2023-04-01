const express = require("express");
const router = express.Router();
const { Article } = require("../modules/article"); //一般直接用对象的方式引入我们数据库规则（模块）
const multer = require("multer");
const fs = require("fs");
const path = require("path");
//  增加
//生成的图片放入uploads文件夹下
let upload = multer({ dest: "uploads/" });
router.post("/articleadd", upload.single("aic"), function (req, res, next) {
  // //读取文件路径
  console.log(req.body);
  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      return res.send("上传失败");
    }
    let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
    //拓展名
    let extname = req.file.mimetype.split("/")[1];
    //拼接成图片名
    let keepname = time + "." + extname;
    // 写人
    fs.writeFile(path.join(__dirname, "../public/img/" + keepname), data, (err) => {
      if (err) {
        return res.send("写入失败");
      }
      let itemUrl;
      if (extname == "html") {
        itemUrl = [];
      } else {
        itemUrl = ["http://192.168.2.12:8099/img/" + keepname];
      }
      console.log(itemUrl);
      // 写入数据库
      const articles = new Article({
        type: req.body.type,
        listType: req.body.listType,
        tit: req.body.tit,
        author: req.body.author,
        authorId: req.body.authorId,
        textType: req.body.textType,
        texetCon: req.body.contenText,
        head: req.body.head,
        time: req.body.time,
        img: itemUrl,
      });
      // 保存到数据库
      articles
        .save()
        .then((rej) => {
          res.send({
            status: 0,
            msg: "发布成功！",
          });
        })
        .catch((err) => {
          res.send({
            status: 444,
            msg: "发布失败！",
          });
        });
    });
  });
});
// 查
router.post("/selectarticle", (req, res) => {
  // 保存到数据库
  let listType = req.body.listType;
  Article.find({ listType }) //查询条件工具参数改变
    .then((rej) => {
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
//Myarticle
// 查
router.post("/Myarticle", (req, res) => {
  // 保存到数据库
  let authorId = req.body.authorId;
  Article.find({ authorId }) //查询条件工具参数改变
    .then((rej) => {
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
module.exports = router;
