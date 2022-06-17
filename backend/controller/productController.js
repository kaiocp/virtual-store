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
  updateProduct,
  //updateOneInfo,
  hasValidProperty
} = require('../service/productService')
router.get('/title/:title', getProductByTitle)
router.get('/:prod_id', idExists, getProductById)
router.get('/', getProducts)
router.post('/', hasValidProperty, isNull, postProducts)
router.delete('/:prod_id', idExists, deleteProducts)
router.put('/:prod_id', hasValidProperty, isNull, idExists, updateProduct)
//router.patch('/:prod_id', isNull, idExists, updateOneInfo)

module.exports = router
