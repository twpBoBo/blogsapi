let mongoose = require("mongoose");
// 设置规则
const courseSchema = new mongoose.Schema({
  // 文档中可以添加的字段
  name: String,
  zhanghao: String,
  paswd: String,
  head: String,
  isPubliched: Boolean,
});
// 注：只有给数据库添加了数据，才能看到该数据库
// 创建集合，返回的是构造函数  （集合名字    配置的规则）    在数据库中集合名字是course
const User = mongoose.model("User", courseSchema);
module.exports = { User }; // courses
