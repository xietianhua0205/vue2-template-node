// 公共的工具函数
const handleDB = require("../db/handleDB");

function getRandomString (n) {
  var str = ""
  while (str.length < n) {
    str += Math.random().toString(36).substring(2);
  }
  return str.substring(str.length - n)
}

// csrfProject钩子函数,执行某一个函数之前和之后可能会执行其他指定的函数,这类函数我们叫钩子函数
function csrfProject (req, res, next) {
  let method = req.method.toLowerCase()
  if (method === 'get') {
    let csrf_toke = getRandomString(48);
    res.cookie('csrf_token', csrf_toke)
    next()
  } else if (method === 'post') {
    // 判断请求头中的 x-csrftoken值,和 cookies 中 的csrf_token进行比对
    if ((req.headers["x-csrftoken"] === req.cookies["csrf_token"])) {
      console.log("csrf验证通过！");
      next()
    } else {
      res.send({ errmsg: "csrf验证不通过!！" });
      return
    }
  }
}

// 格式化时间
function dateFormat (value) {
  var d = new Date(value);
  var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
  return times
}

async function getUserLogin (req,res) {
  // 拿到session中的user_id，判断用户是否登录
  let user_id = req.session['user_id'];
  // 查询数据库，再拿到数据库中id的用户信息
  let result = []
  if(user_id){
    result = await handleDB(res,'info_user','find','info_user数据库查询出错',`id=${user_id}`)
  }
  return  result
}

module.exports = {
  csrfProject,
  dateFormat,
  getUserLogin
}
