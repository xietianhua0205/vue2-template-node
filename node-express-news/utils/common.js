// 公共的工具函数
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
  console.log(method)
  if (method === 'get') {
    let csrf_toke = getRandomString(48);
    console.log(csrf_toke)
    res.cookie('csrf_token', csrf_toke)
    next()
  } else if (method === 'post') {
    // 判断请求头中的 x-csrftoken值,和 cookies 中 的csrf_token进行比对
    console.log(req.headers['x-csrftoken'])
    console.log(req.cookies['csrf_token'])
    if((req.headers["x-csrftoken"] === req.cookies["csrf_token"])){
      console.log("csrf验证通过！");
      next()
    }else{
      res.send({errmsg:"csrf验证不通过!！"});
      return
    }
  }
}

module.exports = {
  csrfProject
}
