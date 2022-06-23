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
  updateCart,
  insertCep,
  deleteCart,
  deleteAllProducts
} = require('../../service/cart/cartService')
const router = express.Router()
router.delete('/delete-all', deleteAllProducts)
router.get('/cep/:cep_number', insertCep)
router.get('/', getCartInfo)
router.post(
  '/',
  hasBodyNullValue,
  hasValidProperty,
  productBodyExists,
  productAlreadyInserted,
  insertProduct
)
router.delete('/:prod_id', productNotAlreadyInserted, deleteCart)
router.put(
  '/:prod_id',
  hasBodyNullValue,
  hasValidUpdate,
  productNotAlreadyInserted,
  updateCart
)

module.exports = router
