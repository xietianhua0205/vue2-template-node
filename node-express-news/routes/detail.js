const express = require('express')
const router = express.Router();
const handleDB = require('../db/handleDB')
const { getUserLogin, abort404, dealWidthTreeData } = require('../utils/common')
require('../utils/filters')
const fs = require("fs");

router.get('/news_detail/:id', (req, res) => {
  (async function() {
    let result = await getUserLogin(req, res)
    let result3 = await handleDB(res, 'info_news', 'sql', 'info_news数据库查询出错', 'select title,id from info_news order by clicks desc limit 0,6')
    const { id } = req.params
    let articleData = await handleDB(res, 'info_news', 'find', 'info_news数据表查询出错', `id=${ id }`)

    // 判断数据id有 news_id这篇新闻
    if (!articleData[0]) {
      abort404(req, res)
      return
    }
    let news_clicks = articleData[0].clicks + 1

    await handleDB(res, 'info_news', 'update', 'info_news数据表查询出错', `id=${ id }`, { clicks: news_clicks })

    // 判断当前文章是否被收藏
    let isCollection = false
    if (result[0]) {
      const collectResult = await handleDB(res, 'info_user_collection', 'find', 'info_user_collection数据表查询出错', `user_id=${ result[0].id } and news_id=${ id }`)
      if (collectResult[0]) {
        isCollection = true
      }
    }
    // 查询和这个新闻相关的评论,按时间排序 desc create_time
    // let commentResult =await handleDB(res, 'info_comment', 'sql', 'info_comment数据库查询出错', 'select * from info_comment ORDER BY IF(ISNULL(parent_id),0,1),create_time ');
    let commentResult = await handleDB(res, 'info_comment', 'find', '数据查询出错', `news_id=${ id } order by create_time desc`)
    let commentTreeResult = dealWidthTreeData(commentResult, commentResult[0], [])
    // 将每个父组件下children解析出来
    fs.writeFile('./test.json', JSON.stringify(commentTreeResult), (err) => {
      console.log(JSON.stringify(commentTreeResult));
      if (err) {
        console.log(err)
      } else {
        console.log('写入成功')
      }
    })
    // 给每条评论添加评论者的信息
    for (let i = 0; i < commentResult.length; i++) {
      const item = commentResult[i]
      let commenterResult = await handleDB(res, 'info_user', 'find', '用户数据查询出错', `id=${ item.user_id }`)
      commentResult[i].commenter = {
        nick_name: commenterResult[0].nick_name,
        avatar_url: commenterResult[0].avatar_url ? commentResult[0].avatar_url : '/images/worm.jpg'
      }
      // 如果 commentResult[i] 有 parent_id 这个属性,就添加 parent 这个属性
      if (commentResult[i].parent_id) {
        var parentComment = await handleDB(res, 'info_comment', 'find', '数据库查询出错', `id=${ commentResult[i].parent_id }`)

        var parentUserInfo = await handleDB(res, 'info_user', 'find', '数据库查询出错', `id=${ parentComment[0].user_id }`)
        commentResult[i].parent = {
          user: {
            nick_name: parentUserInfo[0].nick_name
          },
          content: parentComment[0].content
        }
      }
    }
    // 把登陆用户点赞过得评论全部查询出来,传给前端 []
    let user_like_comment_ids = []
    if (result[0]) {
      // 查询登录用户点赞过得评论对象
      let user_like_comment_result = await handleDB(res, 'info_comment_like', 'find', '数据库查询出错', `user_id=${ result[0].id }`)
      // 遍历
      user_like_comment_ids = user_like_comment_result.map(t => t.comment_id)
    }
    // 查询新闻作者的信息
    let authorResult = await handleDB(res,'info_user','find','数据库查询出错',`id=${articleData[0].user_id}`)
    // 查询作者总文章数
    let authorNewsResult = await handleDB(res,'info_news','sql','数据库查询出错',`select count(*) from info_news where user_id=${articleData[0].user_id}`)
    // 查询用户的粉丝数
    let authorFanResult = await handleDB(res,'info_user_fans','sql','数据库查询出错',`select count(*) from info_user_fans where followed_id=${articleData[0].user_id}`)
    // 判断用户是否关注这个新闻作者
    let isFollow = false
    if (result[0]) {
      const followResult = await handleDB(res, 'info_user_fans', 'find', 'info_user_collection数据表查询出错', `follower_id=${ result[0].id } and followed_id=${ articleData[0].user_id }`)
      if (followResult[0]) {
        isFollow = true
      }
    }

    let data = {
      user_info: result[0] ? {
        nick_name: result[0].nick_name,
        avatar_url: result[0].avatar_url ? result[0].avatar_url : '/images/worm.jpg',
      } : false,
      newsData: articleData[0],
      newsClicks: result3,
      isCollection: isCollection,
      commentTreeResult,
      user_like_comment_ids,
      authorResult: authorResult[0],
      authorNewsResult: authorNewsResult[0]['count(*)'],
      authorFanResult: authorFanResult[0]['count(*)'],
      isFollow
    }
    res.render('detail', data)
  })()
})


router.post('/news_detail/news_collect', (req, res) => {
  (async function() {
    // 判断用户是否登录
    let result = await getUserLogin(req, res)
    if (!result[0]) {
      res.send({
        error: '4101',
        errmsg: '用户未登录'
      })
      return
    }
    const { news_id, action } = req.body
    // 判空
    if (!news_id || !action) {
      res.send({
        error: '4101',
        errmsg: '参数为空'
      })
      return
    }
    // 这个参数可以通过前端接口传递过来
    const user_id = req.session['user_id']
    // 查询数据库,判断新闻是否存在,不存在的话就 return
    let newsResult = await handleDB(res, 'info_news', 'find', '数据库查询出错', `id=${ news_id }`)
    if (!newsResult[0]) {
      res.send({
        errmsg: '该条新闻不存在'
      })
      return
    }
    // 根据 action 的值实现收藏或者取消收藏的功能
    if (req.body.action === 'collect') {
      // 执行收藏
      await handleDB(res, 'info_user_collection', 'insert', 'info_user_collection数据表添加出错', {
        user_id,
        news_id
      })
    } else {
      // 取消收藏
      await handleDB(res, 'info_user_collection', 'delete', 'info_user_collection数据表删除出错', `user_id=${ result[0].id } and news_id=${ news_id }`)
    }
    // 返回
    res.send({ errno: 0, errmsg: '操作成功' })
  })()

})

// 处理回复评论
router.post('/news_detail/news_comment', (req, res) => {
  /**
   *  参数分析：
   *  一种评论新闻:评论内容，新闻的id
   *  一种回复评论: 回复的内容, 回复的id，parent_id(回复那条评论的id)
   * */
  (async function() {
    const { news_id, comment, parent_id = null } = req.body
    // 是否登录
    let result = await getUserLogin(req, res)
    if (!result[0]) {
      res.send({
        error: '4101',
        errmsg: '用户未登录'
      })
      return
    }
    // 校验
    if (!news_id && !comment) {
      res.send({
        errmsg: '参数不正确'
      })
      return
    }
    // 查询数据库,判断当前评论的新闻是否存在,不存在的话就 return
    let newsResult = await handleDB(res, 'info_news', 'find', '数据库查询出错', `id=${ news_id }`)
    if (!newsResult[0]) {
      res.send({
        errmsg: '该条新闻不存在'
      })
      return
    }
    let commmentObj = {
      user_id: result[0].id,
      news_id,
      content: comment
    }
    if (parent_id) {
      commmentObj.parent_id = parent_id
      // 如果有父评论，需要查询父评论的内容(info_comment)和 昵称(info_user)
      var parentComment = await handleDB(res, 'info_comment', 'find', '数据库查询出错', `id=${ parent_id }`)

      var parentUserInfo = await handleDB(res, 'info_user', 'find', '数据库查询出错', `id=${ parentComment[0].user_id }`)
    }
    let insertResult = await handleDB(res, 'info_comment', 'insert', 'info_comment表插入失败', commmentObj)

    let data = {
      user: {
        avatar_url: result[0].avatar_url ? result[0].avatar_url : '/images/worm.jpg',
        nick_name: result[0].nick_name
      },
      content: comment,
      create_time: new Date().toLocaleString(),
      id: insertResult.insertId, // 添加进去的id
      news_id,
      parent: {
        user: {
          nick_name: parentUserInfo ? parentUserInfo[0].nick_name : ''
        },
        content: parentComment ? parentComment[0].content : ''
      }
    }
    res.send({
      errno: '0',
      errmsg: '操作成功',
      data
    })
  })()
})

// 处理点赞 取消点赞
router.post('/news_detail/comment_like', (req, res) => {
  (async function() {
    /**
     *  分析: info_comment_like 表中存在 comment_id user_id
     *  点赞和取消点赞：都是在同一个接口中处理,action
     *  1.如果当前的 comment_id 和 user_id 已经存在数据库表中，说明当前 新闻已经是
     *  点赞的。
     *
     *  业务流程：
     *    1. 获取登录用户的信息
     *    2. 获取参数,判空
     *    3. 查询数据库，看看评论是否存在，
     *    4. 根据 action 值是add 还是 remove，来确定是否是点赞还是取消，添加到数据库中
     *    5. info_comment 表中 count_like 统计
     * */
      // step1
    let result = await getUserLogin(req, res)
    if (!result[0]) {
      res.send({
        errno: '4101',
        errmsg: '用户未登录'
      })
    }
    // step2
    let { comment_id, action } = req.body
    if (!comment_id || !action) {
      res.send({
        errmsg: '参数传递错误'
      })
    }
    // step3
    let commentIsExist = await handleDB(res, 'info_comment', 'find', 'info_comment表查询出错', `id=${ comment_id }`)
    console.log(commentIsExist);
    if (!commentIsExist.length) {
      res.send({
        errmsg: '该条评论不存在'
      })
      return
    } else {
      let like_count = commentIsExist[0].like_count ? commentIsExist[0].like_count : 0
      if (action === 'add') {
        await handleDB(res, 'info_comment_like', 'insert', '数据库添加失败', {
          user_id: result[0].id,
          comment_id
        })
        like_count++
        // +1
      } else {
        await handleDB(res, 'info_comment_like', 'delete', '数据库添加失败', `user_id=${ result[0].id } and comment_id=${ comment_id }`)
        // -1
        like_count--
      }
      await handleDB(res, 'info_comment', 'update', '数据库修改失败', `id=${ comment_id }`, { like_count })
      // 5. 返回操作成功
      res.send({ errno: "0", errmsg: '操作成功' })
    }

  })()
})


// 处理点赞 取消点赞
router.post('/news_detail/followed_user', (req, res) => {
  (async function() {
      // step1
    let result = await getUserLogin(req, res)
    if (!result[0]) {
      res.send({
        errno: '4101',
        errmsg: '用户未登录'
      })
    }
    // step2
    let { user_id, action } = req.body
    if (!user_id || !action) {
      res.send({
        errmsg: '参数传递错误'
      })
    }
    // step3
    let commentIsExist = await handleDB(res, 'info_user', 'find', 'info_comment表查询出错', `id=${ user_id }`)
    console.log(commentIsExist);
    if (!commentIsExist.length) {
      res.send({
        errmsg: '该条评论不存在'
      })
      return
    } else {
      if (action === 'follow') {
        await handleDB(res, 'info_user_fans', 'insert', 'info_user_fans数据库添加失败', {
          follower_id: result[0].id,
          followed_id: user_id
        })
      } else {
        await handleDB(res, 'info_user_fans', 'delete', '数据库添加失败', `follower_id=${ result[0].id } and followed_id=${ user_id }`)
      }
      // 5. 返回操作成功
      res.send({ errno: "0", errmsg: '操作成功' })
    }

  })()
})

module.exports = router
