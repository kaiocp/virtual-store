const express = require('express')
const mysql = require('mysql2')
const pool = require('../db/mySQL')
const { v4: uuidv4 } = require('uuid')

const idExists = (req, res, next) => {
  const { id } = req.params
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query(
      'SELECT * FROM products where id = ?',
      [id],
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          if (response.length === 0) {
            return res.status(404).json({ err: "Product id doesn't exist" })
          }
          req.id = id
          req.product = response
          next()
        }
      }
    )
  })
}

const getProducts = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query('SELECT * FROM products', (err, response) => {
      if (err) {
        return res.status(500).json({ err: err })
      } else {
        pool.releaseConnection(connection)
        return res
          .status(200)
          .json({ message: 'Current products', content: response })
      }
    })
  })
}
const getProductById = (req, res) => {
  const { product } = req
  res.status(200).json({ message: 'Product:', content: product })
}
const getProductByTitle = (req, res) => {
  const { title } = req.params

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: 'Connection refused' })
    }
    connection.query(
      "SELECT * FROM products where PRODUCT_TITLE LIKE CONCAT(?,  '%') ",
      [title],

      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          pool.releaseConnection(connection)
          return res.status(200).json({ message: 'product', content: response })
        }
      }
    )
  })
}
const deleteProducts = (req, res) => {
  const { id } = req
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query(
      'DELETE FROM products where id = ?',
      [id],
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          pool.releaseConnection(connection)
          return res.status(201).json({ message: `Product ${id} deleted` })
        }
      }
    )
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
      return res.status(500).json({ err: err })
    }
    const id = uuidv4()
    connection.query(
      `INSERT INTO products
    (id,
    product_image_url,
    product_title,
    product_discription,
    product_brand,
    product_color,
    product_category,
    product_subcategory,
    product_price)
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
          pool.releaseConnection(connection)
          return res
            .status(201)
            .json({ message: 'Product Created!', self: `products/${id}`, id })
        }
      }
    )
  })
}

module.exports = {
  getProducts,
  postProducts,
  deleteProducts,
  idExists,
  getProductById,
  getProductByTitle
}
