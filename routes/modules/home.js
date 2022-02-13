const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Todo = db.Todo

//首頁
router.get('/', (req, res) => {
   return Todo.findAll({
    //在「查詢多筆資料」的情境，需要將這包參數傳給 findAll()，才能在樣板裡使用資料。
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router