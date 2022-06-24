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
  orderIdIsValid,
  deleteProductFromOrder,
  hasNullQueryParams,
  hasValidDeleteQuery,
  queryOrderIdExists,
  queryProductIdExists,
  queryProductIsInOrder,
  deleteOrder,
  isCepValid,
  updateOrderInfoProperties,
  prodTotaIsValid,
  updateProdTotal
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
router.delete(
  '/delete',
  hasNullQueryParams,
  hasValidDeleteQuery,
  queryOrderIdExists,
  queryProductIdExists,
  queryProductIsInOrder,
  deleteProductFromOrder
)
router.patch(
  '/info/:order_id',
  isCepValid,
  orderIdIsValid,
  updateOrderInfoProperties
)
router.patch(
  '/product',
  hasNullQueryParams,
  hasValidDeleteQuery,
  queryOrderIdExists,
  queryProductIdExists,
  queryProductIsInOrder,
  prodTotaIsValid,
  updateProdTotal
)
router.delete('/delete/all/:order_id', orderIdIsValid, deleteOrder)
module.exports = router
