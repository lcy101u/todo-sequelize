const express = require('express')
const { create } = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000
const hbs = create({ defaultLayout: 'main', extname: '.hbs' })
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})