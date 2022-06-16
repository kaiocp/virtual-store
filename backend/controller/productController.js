const express = require('express')
const router = express.Router()
const {
  getProducts,
  postProducts,
  deleteProducts,
  idExists,
  getProductById,
  getProductByTitle,
  isNull,
  updateProduct
} = require('../service/productService')
router.get('/title/:title', getProductByTitle)
router.get('/:prod_id', idExists, getProductById)
router.get('/', getProducts)
router.post('/', isNull, postProducts)
router.delete('/:prod_id', idExists, deleteProducts)
router.put('/:prod_id', isNull, idExists, updateProduct)

module.exports = router
