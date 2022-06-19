const express = require('express')

const {
  insertProduct,
  productBodyExists,
  productAlreadyInserted,
  getCartInfo,
  hasValidProperty,
  hasBodyNullValue,
  hasValidUpdate,
  productNotAlreadyInserted,
  updateCart
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
router.put(
  '/:prod_id',
  hasBodyNullValue,
  hasValidUpdate,
  productNotAlreadyInserted,
  updateCart
)

module.exports = router
