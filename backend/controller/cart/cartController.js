const express = require('express')

const {
  insertProduct,
  productBodyExists,
  productAlreadyInserted
} = require('../../service/cart/cartService')
const router = express.Router()
router.post('/', productBodyExists, productAlreadyInserted, insertProduct)

module.exports = router
