const express = require('express')
const router = express.Router()
const { getProducts, postProducts } = require('../service/productService')
router.get('/', getProducts)
router.post('/', postProducts)

module.exports = router
