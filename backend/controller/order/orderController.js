const express = require('express')

const router = express.Router()
const {
  insertAllProducts,
  hasBodyNullValue,
  hasInvalidProperty,
  getAllOrders,
  getOneOrder,
  productInBodyExists,
  insertToAlreadyExistOrder,
  productIsAlreadyInOrder,
  hasInvalidPropertyIntoAlreadyInserted,
  orderIdIsValid
} = require('../../service/order/orderService')

router.post(
  '/',
  hasInvalidProperty,
  hasBodyNullValue,
  productInBodyExists,
  insertAllProducts
)
router.post(
  '/:order_id',
  orderIdIsValid,
  hasBodyNullValue,
  hasInvalidPropertyIntoAlreadyInserted,
  productInBodyExists,
  productIsAlreadyInOrder,
  insertToAlreadyExistOrder
)
router.get('/', getAllOrders)
router.get('/:order_id', orderIdIsValid, getOneOrder)
module.exports = router
