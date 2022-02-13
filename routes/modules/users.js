const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

//登入驗證要用的 passport.authenticate 是 Passport 套件功能，所以還是要載入進來。
const passport = require('passport')

const db = require('../../models')
const User = db.User
const Todo = db.Todo
//登入
router
  .route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }))

//註冊  
router
  .route('/register')
  .get((req, res) => {
    res.render('register')
  })
  .post((req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ where: { email } }).then(user => {
      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
  })

//登出
router.get('/logout', (req, res) => {
  req.logout()  //Passport.js 提供的函式，會幫忙清除session
  req.flash('success_msg', '已成功登出！')
  res.redirect('/users/login')
})

module.exports = router