const express = require('express')
const mysql = require('mysql2')
const pool = require('../db/mySQL')
const { v4: uuidv4 } = require('uuid')

const getProducts = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: 'Connection refused' })
    }
    connection.query('SELECT * FROM products', (err, response) => {
      if (err) {
        return res.status(500).json({ err: err })
      } else {
        return res
          .status(200)
          .json({ message: 'Current products', content: response })
        pool.releaseConnection(connection)
      }
    })
  })
}
const postProducts = (req, res) => {
  const {
    product_image_url,
    product_title,
    product_discription,
    product_brand,
    product_color,
    product_category,
    product_subcategory,
    product_price
  } = req.body
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: 'Connection refused' })
    }
    const id = uuidv4()
    connection.query(
      `INSERT INTO products
    (ID,
    PRODUCT_IMAGE_URL,
    PRODUCT_TITLE,
    PRODUCT_DISCRIPTION,
    PRODUCT_BRAND,
    PRODUCT_COLOR,
    PRODUCT_CATEGORY,
    PRODUCT_SUBCATEGORY,
    PRODUCT_PRICE)
    VALUES (?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?);
    `,
      [
        id,
        product_image_url,
        product_title,
        product_discription,
        product_brand,
        product_color,
        product_category,
        product_subcategory,
        product_price
      ],
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          return res
            .status(201)
            .json({ message: 'Product Created!', self: `products/${id}`, id })
          pool.releaseConnection(connection)
        }
      }
    )
  })
}
module.exports = {
  getProducts,
  postProducts
}
