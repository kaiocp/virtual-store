const express = require('express')
const router = express.Router()
const {
  insertAllProducts,
  hasBodyNullValue,
  hasInvalidProperty
} = require('../../service/order/orderService')

router.post('/', hasInvalidProperty, hasBodyNullValue, insertAllProducts)

module.exports = router
