const express = require('express')
const mysql = require('mysql2')
const pool = require('../db/mySQL')
const { v4: uuidv4 } = require('uuid')
const { json } = require('express')

const idExists = (req, res, next) => {
  const { prod_id } = req.params
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query(
      'SELECT * FROM products where prod_id = ?',
      [prod_id],
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          if (response.length === 0) {
            return res.status(404).json({ err: "Product id doesn't exist" })
          }
          req.prod_id = prod_id
          req.product = response
          next()
        }
      }
    )
  })
}
const invalidProperty = requestBody => {
  for (property in requestBody) {
    if (
      property !== 'product_image_url' &&
      property !== 'product_title' &&
      property !== 'product_discription' &&
      property !== 'product_brand' &&
      property !== 'product_color' &&
      property !== 'product_category' &&
      property !== 'product_subcategory' &&
      property !== 'product_price'
    ) {
      return true
    }
    continue
  }
  return false
}
const isNull = (req, res, next) => {
  const responseBody = req.body
  if (!responseBody) {
    return res.status(400).json({ err: 'Invalid:Your request body is NULL' })
  }
  for (const property in responseBody) {
    if (property != 'product_price' && !responseBody[property]) {
      return res
        .status(400)
        .json({ err: `Invalid:The property ${property} of your body is NULL` })
    }
  }
  next()
}

const getProducts = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query(
      `SELECT product.*,
    product_brand.brand_name,
    product_color.color_name,
    category.category_name,
    sub_category.subcategory_name,
    product_total.prod_total
    FROM product_total
    JOIN product
    ON product.prod_id = product_total.prod_id
    JOIN product_brand
    ON product.prod_id = product_brand.prod_id
    JOIN product_color
    ON product.prod_id = product_color.prod_id
    JOIN category
    ON product.prod_id = category.prod_id
    JOIN sub_category
    ON product.prod_id = sub_category.prod_id 
    WHERE product_total.prod_total > 0;`,
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          pool.releaseConnection(connection)
          return res
            .status(200)
            .json({ message: 'Current products', content: response })
        }
      }
    )
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
      `SELECT product.*,
      product_brand.brand_name,
      product_color.color_name,
      category.category_name,
      sub_category.subcategory_name,
      product_total.prod_total
      FROM product_total
      JOIN product
      ON product.prod_id = product_total.prod_id
      JOIN product_brand
      ON product.prod_id = product_brand.prod_id
      JOIN product_color
      ON product.prod_id = product_color.prod_id
      JOIN category
      ON product.prod_id = category.prod_id
      JOIN sub_category
      ON product.prod_id = sub_category.prod_id 
      WHERE product_total.prod_total > 0 
      AND product.prod_title LIKE CONCAT(?,  '%');
      `,
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
  const { prod_id } = req
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query(
      'DELETE FROM products where prod_id = ?',
      [prod_id],
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          pool.releaseConnection(connection)
          return res.status(201).json({ message: `Product ${prod_id} deleted` })
        }
      }
    )
  })
}
const postProducts = (req, res) => {
  const {
    prod_title,
    prod_description,
    prod_price,
    prod_image_url,
    prod_brand,
    prod_color,
    prod_category,
    prod_subcategory
  } = req.body
  console.log(req.body)
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    const myquery =
      'INSERT INTO product VALUES (?,?,?,?,?,?); ' +
      'INSERT INTO product_brand VALUES (?, ?); ' +
      'INSERT INTO product_color VALUES (?, ?); ' +
      'INSERT INTO category VALUES (?,?); ' +
      'INSERT INTO sub_category VALUES (?,?); ' +
      'INSERT INTO product_total VALUES (?, 1);'
    console.log(myquery)
    const prod_id = uuidv4()
    var date = new Date()
    var prod_register_time =
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2) +
      ' ' +
      ('00' + date.getHours()).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2)

    connection.query(
      myquery,
      [
        prod_id,
        prod_title,
        prod_description,
        prod_price,
        prod_image_url,
        prod_register_time,
        prod_id,
        prod_brand,
        prod_id,
        prod_color,
        prod_id,
        prod_category,
        prod_id,
        prod_subcategory,
        prod_id
      ],
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          pool.releaseConnection(connection)
          return res.status(201).json({
            message: 'Product Created!',
            self: `products/${prod_id}`,
            prod_id
          })
        }
      }
    )
  })
}

const updateProduct = (req, res) => {
  const { prod_id } = req
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
      return res.status.json({ err: 'Connection failed' })
    }
    connection.query(
      `INSERT INTO
  product
VALUES
  (
    '23d64c3f-cac6-4b98-b755-364b84a1db56',
    'TITLE',
    'description',
    10.4,
    'url',
    '2022-06-17 15:57:03'
  );

INSERT INTO
  product_brand
VALUES
('23d64c3f-cac6-4b98-b755-364b84a1db56', 'brand');

INSERT INTO
  product_color
VALUES
('23d64c3f-cac6-4b98-b755-364b84a1db56', 'color');

INSERT INTO
  category
VALUES
(
    '23d64c3f-cac6-4b98-b755-364b84a1db56',
    'category'
  );

INSERT INTO
  sub_category
VALUES
(
    '23d64c3f-cac6-4b98-b755-364b84a1db56',
    'subcategory'
  );

INSERT INTO
  product_total
VALUES
('23d64c3f-cac6-4b98-b755-364b84a1db56', 1);`,
      [
        product_image_url,
        product_title,
        product_discription,
        product_brand,
        product_color,
        product_category,
        product_subcategory,
        product_price,
        prod_id
      ],
      (err, response) => {
        if (err) {
          res.status(500).json({ err: err })
        }
        pool.releaseConnection(connection)
        res.status(200).json({ message: `Product ${prod_id} updated` })
      }
    )
  })
}
const updateOneInfo = (req, res) => {
  const { prod_id } = req
  const requestBody = req.body
  if (invalidProperty(requestBody)) {
    return res
      .status(400)
      .json({ err: "Your body has some invalides properties' names" })
  }

  for (bodyProperty in requestBody) {
    const bodyValue = requestBody[bodyProperty]
    const property = bodyProperty

    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ err: 'Connection failed' })
      }
      pool.getConnection((err, connection) => {
        if (err) {
          return res.status(500).json({ err: 'Connection failed' })
        }

        connection.query(
          `UPDATE products SET ${property} = ? WHERE prod_id = ?`,
          [bodyValue, prod_id],
          (err, response) => {
            //console.log(response)
            if (err) {
              res.status(500).json({ err: err })
            }
            pool.releaseConnection(connection)
          }
        )
      })

      connection.query(
        `UPDATE products SET ${property} = ? WHERE prod_id = ?`,
        [bodyValue, prod_id],
        (err, response) => {
          if (err) {
            res.status(500).json({ err: err })
          }
          pool.releaseConnection(connection)
        }
      )
    })
  }
  res.status(200).json({
    message: `Product ${prod_id}  updated`
  })
}

module.exports = {
  getProducts,
  postProducts,
  deleteProducts,
  idExists,
  getProductById,
  getProductByTitle,
  isNull,
  updateProduct,
  updateOneInfo
}
