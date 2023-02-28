const express = require('express')
const router = express.Router();
const handleDB = require('../db/handleDB')
const { getUserLogin } = require('../utils/common')
require('../utils/filters')

router.get('/news_detail/:id', (req, res) => {
  (async function() {
    let result = await getUserLogin(req, res)
    let result3 = await handleDB(res, 'info_news', 'sql', 'info_news数据库查询出错', 'select title,id from info_news order by clicks desc limit 0,6')
    const { id } = req.params
    let articleData = await handleDB(res, 'info_news', 'find', 'info_news数据表查询出错', `id=${ id }`)

    // 判断数据id有 news_id这篇新闻
    if(!articleData[0]){
      let data = {
        user_info: result[0] ? {
          nick_name: result[0].nick_name,
          avatar_url: result[0].avatar_url
        } : false
      }
      res.render('404',data)
    }
    let news_clicks = articleData[0].clicks + 1

    await handleDB(res, 'info_news', 'update', 'info_news数据表查询出错', `id=${ id }`, { clicks: news_clicks })
    let data = {
      user_info: result[0] ? {
        nick_name: result[0].nick_name,
        avatar_url: result[0].avatar_url
      } : false,
      newsData: articleData[0],
      newsClicks: result3
    }
    console.log(articleData[0])
    res.render('detail', data)
  })()
})

module.exports = router
