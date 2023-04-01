var { expressjwt: jwt } = require("express-jwt");
let config = require("../config"); //读取配置文件config.js信息
const jwtAuth = jwt({ secret: config.TOKEN_KEY, algorithms: ["HS256"] }).unless({
  path: [
    "/",
    "/login",
    "/register",
    "/public",
    "/mucis",
    "/Muiscsearch",
    "/songUrl",
    "/songLyric",
    "/head",
  ], // 设置 jwt 认证白名单
});
module.exports = jwtAuth;
