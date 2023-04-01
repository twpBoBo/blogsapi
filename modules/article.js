let mongoose = require("mongoose");
// 设置规则
const courseSchema = new mongoose.Schema({
  // 文档中可以添加的字段
  type: String,
  listType: String,
  tit: String,
  author: String,
  authorId: String,
  head: String,
  textType: String,
  texetCon: String,
  time: Date,
  img: Array,
});
// 注：只有给数据库添加了数据，才能看到该数据库
// 创建集合，返回的是构造函数  （集合名字    配置的规则）    在数据库中集合名字是course
const Article = mongoose.model("Article", courseSchema);
module.exports = { Article }; // courses
