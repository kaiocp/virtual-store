const express = require('express')
const router = express.Router()
const {
  getProducts,
  postProducts,
  deleteProducts,
  idExists
} = require('../service/productService')
router.get('/', getProducts)
router.post('/', postProducts)
router.delete('/:id', idExists, deleteProducts)

module.exports = router
