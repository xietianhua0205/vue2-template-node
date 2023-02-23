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
  res.send(`设置的cookie值为${name},设置的session值为${age}`)
})

router.get('/', (req, res) => {
  res.render('index')
})

// 数据库数据已经获取到了
router.get('/get_data',(req,res)=>{
  (async function (){
    const result  = await handleDB(res,'info_category','find','数据库查询出错')
    res.send(result)
  })()
})




module.exports = router
