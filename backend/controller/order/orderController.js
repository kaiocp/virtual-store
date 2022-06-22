const express = require('express')
const router = express.Router()
const { insertAllProducts } = require('../../service/order/orderService')

const {
  hasValidProperty,
  hasBodyNullValue,
  productBodyExists
} = require('../../service/cart/cartService')
router.post('/', insertAllProducts)

module.exports = router
