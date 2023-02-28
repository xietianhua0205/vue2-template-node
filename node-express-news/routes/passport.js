/**
 *  注册, 验证,登录模块
 * */

const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB')
const Captcha = require("../utils/captcha/index") // 引入captcha的工具
const md5 = require('md5')
const { password_salt } = require("../keys")

router.get('/passport/image_code/:randomNum', (req, res) => {
  let captchaObj = new Captcha();
  let captcha = captchaObj.getCode();
  // 生成验证码,将验证码信息存储到session 中，用于注册时验证
  req.session['IMG_CODE'] = captcha.text

  // 配合 img标签的src属性请求来展示验证图片的时候，需要设置响应头
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(captcha.data)
})

// 注册接口
router.post('/passport/register', (req, res) => {
  // 分析注册功能需要的功能
  // 获取 post 请求参数 做检验
  req.on('data', (postdata) => {
    (async () => {
      const data = JSON.parse(postdata.toString())
      const { username, image_code, password, agree } = data
      if (!username) {
        res.send({
          errmsg: '用户名不能为空'
        })
        return
      } else if (!image_code) {
        res.send({
          errmsg: '图片验证码不能为空'
        })
        return
      } else if (!password) {
        res.send({
          errmsg: '密码不能为空'
        })
        return
      }
      // 验证图片验证码是否正确, return 出去
      if (req.session['IMG_CODE'].toLowerCase() !== image_code.toLowerCase()) {
        res.send({
          errmsg: '图片验证码错误'
        })
        return
      }

      const userArr = await handleDB(res, 'info_user', 'find', 'info_user数据库查询出错', `username="${ username }"`)
      if (userArr.length > 0) {
        res.send({
          errmsg: '用户名已注册'
        })
        return
      } else {
        // 双重 MD5 加盐 加密
        let ret = md5(md5(password)) + password_salt // 这一串随机数字就是加盐
        const result = await handleDB(res, 'info_user', 'insert', '用户信息插入数据出错', {
          username,
          nick_name: username,
          password_hash: ret
        })
        // 保持登录状态
        req.session['user_id'] = result.insertId

        res.send({
          errno: "0",
          errmsg: "注册成功"
        })
      }
    })()
  })

  // 查询数据库用户是否被注册
  // 已经注册的，返回用户名已经被注册，进行return
  // 如果不存在，向数据库中添加一条记录
  // 保持登录状态
  // 返回响应成功
})

// 登录接口
router.post('/passport/login', (req, res) => {
  req.on('data', (postData) => {
    (async function() {
      // 校验用户名 和 密码 不为空
      let { username, password } = JSON.parse(postData.toString())
      if (!username && !password) {
        return res.send({
          errmsg: "请求参数不可为空"
        })
      }
      // 查询数据库 用户名 和 密码进行校验
      let result = await handleDB(res, 'info_user', 'find', '用户表数据库查询出错', `username="${ username }"`)
      if (result.length > 0) {
        // 将用户信息按照需求返回给前端显示
        if (result[0].password_hash === md5(md5(password)) + password_salt) {
          // 将登录者的信息保存
          req.session['user_id'] = result[0].id
          return res.send({
            errno: "0",
            errmsg: "登录成功",
            userMSg: result[0]
          })
        } else {
          return res.send({
            errmsg: "用户名或密码不正确",
          })
        }
      }
      res.send({
        errmsg: "用户不存在"
      })
    })()
  })


})

// 退出登录
router.post('/passport/logout', (req, res) => {
  delete req.session['user_id']
  res.send({ errno: '0', errmsg: '退出登录成功' })
})


module.exports = router
