// 1.导入express
const express = require("express");
// 2.创建服务器的实例对象
const app = express();
// // 1.1 导入并配置cors中间件 解决跨域
const cors = require("cors");
app.use(cors());

app.use(express.static("./public")); //静态

let config = require("./config"); //读取配置文件config.js信息
// 解析POST请求
// 1.2 配置解析表单数据的中间件, 这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }));
// 1.3 只能解析parse application/json 格式
app.use(express.json());

// 链接数据库
let mongoose = require("mongoose");
mongoose.connect(config.database);

//监听调用
app.use((request, response, next) => {
  console.log("请求来自于", request.get("Host"));
  console.log("请求的地址", request.url);
  next(); //外下走
});
//基础路由
app.get("/", function (req, res) {
  res.send("这里是uni-app");
});

// 一帮在路由文件中使用
// 使用token验证
const jwtAuth = require("./uitls/jwt");
//对所有路由进行jwt认证
// router.use(jwtAuth);
app.use(jwtAuth);

// 配置多个路由模块
app.use(require("./router/user"));
app.use(require("./router/article"));
app.use(require("./router/proxy"));
app.use((err, req, res, next) => {
  // 如果错误是由token解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  // 如果是其他位置原因导致的错误
  res.send({
    status: 500,
    message: "未知的错误",
  });
  next();
});

app.listen(8999, () => {
  console.log("express server running at http://127.0.0.1:8999");
});
