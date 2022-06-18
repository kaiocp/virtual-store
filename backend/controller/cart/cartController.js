const express = require('express')

const {
  insertProduct,
  productBodyExists,
  productAlreadyInserted,
  getCartInfo
} = require('../../service/cart/cartService')
const router = express.Router()

router.get('/', getCartInfo)
router.post('/', productBodyExists, productAlreadyInserted, insertProduct)

module.exports = router
