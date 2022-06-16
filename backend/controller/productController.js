const express = require('express')
const router = express.Router()
const {
  getProducts,
  postProducts,
  deleteProducts,
  idExists,
  getProductById,
  getProductByTitle
} = require('../service/productService')
router.get('/', getProducts)
router.post('/', postProducts)
router.delete('/:id', idExists, deleteProducts)
router.get('/title/:title', getProductByTitle)
router.get('/:id', idExists, getProductById)

module.exports = router
