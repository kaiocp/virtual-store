const express = require('express')
const router = express.Router()
const {
  insertAllProducts,
  hasBodyNullValue,
  hasInvalidProperty,
  getAllOrders,
  getOneOrder
} = require('../../service/order/orderService')

router.post('/', hasInvalidProperty, hasBodyNullValue, insertAllProducts)
router.get('/', getAllOrders)
router.get('/:order_id', getOneOrder)
module.exports = router
