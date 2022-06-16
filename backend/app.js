const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const productController = require('./controller/productController')
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With , Content-Type , Acccept , Authorization'
  )
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
    return res.status(200).send()
  }
  app.use(cors())
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/products', productController)

module.exports = app
