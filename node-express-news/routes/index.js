const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB')
const { getUserLogin } = require('../utils/common')

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

// 首页分类展示
// id, 当前页数, 每页展示条目树
router.get('/news_list', (req, res) => {
  // 获取参数 cid(新闻分类),page(当前页数),per_page(每一页条数)
  (async function() {
    const { page, cid, per_page } = req.query
    let wh = cid != '1' ? `category_id= ${ cid } order by create_time desc` : `1 order by create_time desc`
    let result = await handleDB(res, 'info_news', 'limit', 'info_news 数据库查询出错', {
      where: wh,
      number: page,
      count: per_page
    })
    // result = await handleDB(res, 'info_news', 'sql', 'info_news数据表查询出错', `select *
    //                                                                       from info_news
    //                                                                       where category_id = ${ cid }
    //                                                                       order by create_time desc limit ${ page }, ${ per_page }`)
    // 触底加载,获取总页码
    let totalCount = await handleDB(res, 'info_news', 'sql', 'info_new数据库查询出', 'select count(*) from info_news where'+ ' ' + wh)
    console.log(totalCount);
    // 获取总的条目数,在向上取整,获得总页数
    let total = Math.ceil(totalCount[0]['count(*)'] / per_page)
    console.log(total);
    res.send({
      totalPage: total,
      newsList: result,
      currentPage: parseInt(page)
    })
  })()
})

router.get('/', (req, res) => {
  (async function() {
    let result = await getUserLogin(req, res)
    // todo 接口可以抽离
    // 首页头部分类(可以抽取出来)
    let result2 = await handleDB(res, 'info_category', 'find', '新闻分类表查询出错', ['name'])
    // todo 右侧点击排行榜
    // 点击量排序,分页,取前六条数据
    // select title from info_news order by clicks desc limit(0,6)
    let sortData = await handleDB(res, 'info_news', 'sql', 'info_news表查询出错', 'select title,id from info_news order by clicks desc limit 6')
    let data = {
      user_info: result[0] ? {
        nick_name: result[0].nick_name,
        avatar_url: result[0].avatar_url
      } : false,
      category: result2,
      newsClicks: sortData
    }
    res.render('index', data)
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
