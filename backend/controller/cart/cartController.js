const express = require('express')

const {
  insertProduct,
  productBodyExists,
  productAlreadyInserted,
  getCartInfo,
  hasValidProperty,
  hasBodyNullValue
} = require('../../service/cart/cartService')
const router = express.Router()

router.get('/', getCartInfo)
router.post(
  '/',
  hasBodyNullValue,
  hasValidProperty,
  productBodyExists,
  productAlreadyInserted,
  insertProduct
)

module.exports = router
