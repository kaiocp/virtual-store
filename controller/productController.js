const express = require('express')
const router = express.Router()
const { getProducts } = require('../service/productService')
router.get('/', getProducts)

module.exports = router
