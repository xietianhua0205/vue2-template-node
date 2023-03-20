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

async function getUserLogin (req, res) {
  // 拿到session中的user_id，判断用户是否登录
  let user_id = req.session['user_id'];
  // 查询数据库，再拿到数据库中id的用户信息
  let result = []
  if (user_id) {
    result = await handleDB(res, 'info_user', 'find', 'info_user数据库查询出错', `id=${ user_id }`)
  }
  return result
}

async function abort404 (req, res) {
    let result = await getUserLogin(req, res)
    let data = {
      user_info: result[0] ? {
        nick_name: result[0].nick_name,
        avatar_url: result[0].avatar_url
      } : false
    }
    res.render('404', data)
}

function dealWidthTreeData (temp, node, finallyArr) { // 这个方法能将某一条线给收起来
  if(!temp.length){
    return []
  }
  let tempNode = node;
  // 寻找当前节点的最下层节点
  if (!node.isHandle) {
    for (let i = 0; i < temp.length; i++) {
      const subNode = temp[i]
      if (subNode.parent_id && subNode.parent_id === tempNode.id) {
        tempNode = subNode
        i = 0
      }
    }
  }
  // 标记节点
  tempNode.isHandle = true
  if (tempNode.parent_id) { // 如果存在父级节点
    const filterItem = temp.find((t) => {
      return t.id === tempNode.parent_id
    })
    if (filterItem.isHandle) { // 说明当前节点是之前遗漏的节点
      filterItem.children.push(tempNode)
      for (let i = 0; i < temp.length; i++) {
        if (!temp[i].isHandle) {
          dealWidthTreeData(temp, temp[i], finallyArr)
          break
        }
      }
    } else {
      filterItem.isHandle = true
      if (filterItem) {
        if (filterItem.children) {
          filterItem.children.push(tempNode)
        } else {
          filterItem.children = []
          filterItem.children.push(tempNode)
        }
        dealWidthTreeData(temp, filterItem, finallyArr)
      }
    }
  } else {
    finallyArr.push(node)
    for (let i = 0; i < temp.length; i++) {
      if (!temp[i].isHandle) {
        dealWidthTreeData(temp, temp[i], finallyArr)
        break
      }
    }
  }
  return finallyArr
}

module.exports = {
  csrfProject,
  dateFormat,
  getUserLogin,
  abort404,
  dealWidthTreeData
}
