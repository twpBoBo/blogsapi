const express = require("express");
const axios = require("axios");
const router = express.Router();
const BaseUrl = "https://autumnfish.cn/";
// 最新推荐歌单
router.get("/mucis", (req, res) => {
  let linmit = 21;
  let offset = req.query.page.page;
  axios({
    method: "get",
    url: BaseUrl + "/playlist/detail?id=19723756",
  }).then((result) => {
    let data = result.data.playlist.tracks.slice(
      (offset - 1) * linmit,
      linmit + (offset - 1) * linmit
    );
    res.send({
      totlo: 100,
      sate: 0,
      data,
    });
  });
});
// 歌曲搜索
router.get("/Muiscsearch", (req, res) => {
  console.log(req.query.keywords);
  if (req.query.keywords == "") {
    return;
  }
  axios({
    method: "get",
    url: BaseUrl + `/search`,
    params: {
      keywords: req.query.keywords,
    },
  }).then((ret) => {
    console.log(ret.data);
    res.send({
      data: ret.data.result.songs,
    });
  });
});
// 歌曲播放
router.get("/songUrl", (req, res) => {
  axios({
    method: "get",
    url: BaseUrl + `song/url/v1?id=${req.query.id}&level=lossless`,
  }).then((ret) => {
    res.send({
      data: ret.data.data,
    });
  });
});
// 歌曲歌词
router.get("/songLyric", (req, res) => {
  // console.log(req.query.id);
  axios({
    method: "get",
    url: BaseUrl + `/lyric`,
    params: {
      id: req.query.id,
    },
  }).then((ret) => {
    res.send({
      data: ret.data,
    });
  });
});
// 另一种请求方式
// 发送 POST 请求
// axios.post('http://localhost:3000/axios', {
//       uname: 'lisi',
//       pwd: 123
//      }).then(function(ret){
//        console.log(ret.data)
//      })

// Get请求
// axios.get('http://localhost:3000/axios', {
//        params: {
//          id: 789
//        }
//      }).then(function(ret){
//        console.log(ret.data)
//      })

module.exports = router;
