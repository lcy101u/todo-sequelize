const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name

  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router
  .route('/:id')
  .get((req, res) => {
    const UserId = req.user.id
    const id = req.params.id
    console.log('UserId: ', UserId)
    console.log('id: ', id)
    return Todo.findOne({
      where: { id, UserId }
    })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
  })
  .put((req, res) => {
    const UserId = req.user.id
    const id = req.params.id
    const { name, isDone } = req.body
    console.log(req.body)

    return Todo.findOne({ where: { id, UserId } })
      .then(todo => {
        todo.name = name
        todo.isDone = isDone === 'on'
        return todo.save()
      })
      .then(() => res.redirect(`/todos/${id}`))
      .catch(error => console.log(error))
  })
  .delete((req, res) => {
    const UserId = req.user.id
    const id = req.params.id

    return Todo.findOne({ where: { id, UserId } })
      .then(todo => todo.destroy())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })

router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.get() }))
    .catch(error => console.log(error))
})

module.exports = router

// 查詢多筆資料：要在 findAll({ raw: true, nest: true}) 直接傳入參數
// 查詢單筆資料：在 res.render 時在物件實例 todo 後串上 todo.toJSON()。