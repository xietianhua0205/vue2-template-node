const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB')

router.get('/set_cookie', (req, res) => {
  res.cookie('name', 'nodejs')
  req.session.age = 20
  res.send('设置了cookie和session1')
})

router.get('/get_cookie', (req, res) => {
  const name = req.cookies.name
  const age = req.session.age
  res.send(`设置的cookie值为${ name },设置的session值为${ age }`)
})

router.get('/', (req, res) => {
  (async function() {
    // 拿到 session 中的 user_id,判断是否登录
    let user_id = req.session['user_id']
    // 拿到数据库中id用户信息
    let result = []
    if (user_id) {
      result = await handleDB(res, 'info_user', 'find', '用户表查询出错', `id="${ user_id }"`)
    }
    // todo 接口可以抽离
    // 首页头部分类(可以抽取出来)
    let result2 = await handleDB(res,'info_category','find','新闻分类表查询出错',['name'])
    // todo 右侧点击排行榜
    // 点击量排序,分页,取前六条数据
    // select title from info_news order by clicks desc limit(0,6)
    let sortData = await handleDB(res,'info_news','sql','info_news表查询出错','select title from info_news order by clicks desc limit 6')
    let data = {
      user_info: result[0] ? {
        nick_name: result[0].nick_name,
        avatar_url: result[0].avatar_url
      } : false,
      category: result2,
      newsClicks: sortData
    }
    res.render('index',data)
  })()
})

// 数据库数据已经获取到了
router.get('/get_data', (req, res) => {
  (async function() {
    const result = await handleDB(res, 'info_category', 'find', '数据库查询出错')
    res.send(result)
  })()
})


module.exports = router
