const express = require('express')

const {
  insertProduct,
  productBodyExists,
  productAlreadyInserted,
  getCartInfo,
  hasValidProperty
} = require('../../service/cart/cartService')
const router = express.Router()

router.get('/', getCartInfo)
router.post(
  '/',
  hasValidProperty,
  productBodyExists,
  productAlreadyInserted,
  insertProduct
)

module.exports = router
