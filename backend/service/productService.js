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
      `SELECT
      product.*,
      product_brand.brand_name,
      product_color.color_name,
      category.category_name,
      sub_category.subcategory_name,
      product_total.prod_total
    FROM
      product_total
      JOIN product ON product.prod_id = product_total.prod_id
      JOIN product_brand ON product.prod_id = product_brand.prod_id
      JOIN product_color ON product.prod_id = product_color.prod_id
      JOIN category ON product.prod_id = category.prod_id
      JOIN sub_category ON product.prod_id = sub_category.prod_id
    WHERE
      product_total.prod_total > 0
      AND product.prod_id = ?;`,
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
const hasValidProperty = (req, res, next) => {
  const requestBody = req.body
  const validProperty = [
    'prod_title',
    'prod_description',
    'prod_price',
    'prod_image_url',
    'prod_brand',
    'prod_color',
    'prod_category',
    'prod_subcategory'
  ]
  for (property in requestBody) {
    const isValid = validProperty.some(element => {
      return property === element
    })
    if (!isValid) {
      return res
        .status(400)
        .json({ err: "Your body has some invalides properties' names" })
    }
  }
  console.log('Se saiu')
  next()
}
const isNull = (req, res, next) => {
  const responseBody = req.body
  if (!responseBody) {
    return res.status(400).json({ err: 'Invalid:Your request body is NULL' })
  }
  for (const property in responseBody) {
    if (property != 'prod_price' && !responseBody[property]) {
      console.log('Entrou')
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
    WHERE product_total.prod_total > 0
    ORDER BY product.prod_register_time
    ;`,
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: 'Failed to get products' })
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
          return res.status(500).json({ err: 'Failed to get products' })
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
      'DELETE FROM product_total where product_total.prod_id = ?',
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
          return res.status(500).json({ err: 'Failed to post product' })
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
    prod_title,
    prod_description,
    prod_price,
    prod_image_url,
    prod_brand,
    prod_color,
    prod_category,
    prod_subcategory
  } = req.body
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status.json({ err: 'Connection failed' })
    }
    connection.query(
      `UPDATE
      product
    SET
      product.prod_title = ?,
      product.prod_description = ?,
      product.prod_price = ?,
      product.prod_image_url = ?
    WHERE
      product.prod_id = ?;
    
    UPDATE
      product_brand
    SET
      product_brand.brand_name = ?
    WHERE
      product_brand.prod_id = ?;
    
    UPDATE
      product_color
    SET
      product_color.color_name = ?
    WHERE
      product_color.prod_id = ?;
      
     UPDATE
      category
    SET
      category.category_name = ?
    WHERE
      category.prod_id = ?;
      
      UPDATE
      sub_category
    SET
      sub_category.subcategory_name = ?
    WHERE
      sub_category.prod_id = ?;`,
      [
        prod_title,
        prod_description,
        prod_price,
        prod_image_url,
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
        console.log(err)
        if (err) {
          res.status(500).json({ err: 'Product update failed' })
        }
        pool.releaseConnection(connection)
        res.status(200).json({ message: `Product ${prod_id} updated` })
      }
    )
  })
}
/*const updateOneInfo = (req, res) => {
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
*/
module.exports = {
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
}
