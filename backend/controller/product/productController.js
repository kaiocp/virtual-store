const express = require('express')
const router = express.Router()
const {
  getProducts,
  postProducts,
  deleteProducts,
  productExists,
  getProductById,
  getProductByTitle,
  isNull,
  updateProduct,
  updateOneInfo,
  hasValidProperty
} = require('../../service/product/productService')
router.get('/title/:title', getProductByTitle)
router.get('/:prod_id', productExists, getProductById)
router.get('/', getProducts)
router.post('/', hasValidProperty, isNull, postProducts)
router.delete('/:prod_id', productExists, deleteProducts)
router.put('/:prod_id', hasValidProperty, isNull, productExists, updateProduct)
router.patch(
  '/:prod_id',
  hasValidProperty,
  isNull,
  productExists,
  updateOneInfo
)

module.exports = router
