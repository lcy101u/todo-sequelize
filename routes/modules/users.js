const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Todo = db.Todo
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
    const { name, email, password, confirmPassword } = req.body
    User.create({ name, email, password })
      .then(user => res.redirect('/'))
  })

//登出
router.get('/logout', (req, res) => {
  res.send('logout')
})
module.exports = router