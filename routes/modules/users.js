const express = require('express')
const router = express.Router()

//登入
router
  .route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post((req, res) => {
    res.send('login')
  })

//註冊  
router
  .route('/register')
  .get((req, res) => {
    res.render('register')
  })
  .post((req, res) => {
    res.send('register')
  })

//登出
router.get('/logout', (req, res) => {
  res.send('logout')
})
module.exports = router