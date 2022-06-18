const pool = require('../../db/mySQL')
const express = require('express')
const productBodyExists = (req, res, next) => {
  const { prod_id } = req.body
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query(
      `SELECT COUNT(prod_id) from product where prod_id = ? `,
      [prod_id],
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          const responseExists = response[0]['COUNT(prod_id)']

          if (!responseExists) {
            pool.releaseConnection(connection)
            return res.status(404).json({ err: "Product doesn't exist" })
          }
          pool.releaseConnection(connection)
          req.prod_id = prod_id
          next()
        }
      }
    )
  })
}
const updateCartInfo = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      return null
    }
    connection.query(
      `SELECT
      SUM(product.prod_price) as sum ,
      SUM(contains_with.prod_total) as total_prod
      FROM contains_with
      JOIN product
      ON contains_with.cart_id = product.prod_id;`,
      (err, res) => {
        const { sum, total_prod } = res[0]

        if (err) {
          return
        }
        pool.releaseConnection(connection)
        pool.getConnection((err, conn) => {
          if (err) {
            console.log(err)
            return
          }
          conn.query(
            `UPDATE cart set cart_subtotal=?,cart_prod_total=?
             WHERE cart_id = 4;`,
            [sum, total_prod],
            (err, queryResponse) => {
              if (err) {
                console.log(err)
                return
              }
              pool.releaseConnection(conn)
              console.log('Sucess!')
              return
            }
          )
        })

        return res
      }
    )
  })
}
const productAlreadyInserted = (req, res, next) => {
  const { prod_id } = req.body
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query(
      `SELECT COUNT(prod_id) from contains_with where prod_id = ? `,
      [prod_id],
      (err, response) => {
        if (err) {
          return res.status(500).json({ err: err })
        } else {
          const responseExists = response[0]['COUNT(prod_id)']
          if (responseExists) {
            pool.releaseConnection(connection)
            return res.status(404).json({ err: 'Product Already inserted!' })
          }
          pool.releaseConnection(connection)
          req.prod_id = prod_id
          next()
        }
      }
    )
  })
}
const insertProduct = (req, res) => {
  const { prod_id } = req
  const { prod_total } = req.body
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({ err: 'Failed to connect' })
    }

    connection.query(
      'INSERT INTO contains_with VALUES (4,?,?) ;',
      [prod_id, prod_total],
      (err, data) => {
        console.log(err)
        if (err) {
          res.status(500).json({ err: 'Failed to insert into cart' })
        }

        pool.releaseConnection(connection)
        updateCartInfo()

        return res
          .status(201)
          .json({ message: `Product ${prod_id} inserted into cart!` })
      }
    )
  })
}
const getCartInfo = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({ err: 'Failed to connect' })
    }

    connection.query(
      `SELECT cart_subtotal, cart_prod_total
      FROM cart WHERE cart_id = 4;`,
      (err, data) => {
        if (err) {
          res.status(500).json({ err: 'Failed get itens from cart' })
        }
        const { cart_subtotal, cart_prod_total } = data[0]

        pool.releaseConnection(connection)

        pool.getConnection((err, conn) => {
          console.log('Entrou aqui')
          if (err) {
            res.status(500).json({ err: 'Failed to connect' })
          }
          conn.query(
            `SELECT
          product.prod_id,
          product.prod_title,
          product.prod_description,
          product.prod_price,
          product.prod_image_url,
          contains_with.prod_total
        FROM
          contains_with
          JOIN product ON contains_with.prod_id = product.prod_id
        WHERE
          contains_with.cart_id = 4;`,
            (error, response) => {
              if (error) {
                res.status(500).json({ err: 'Failed get itens from cart' })
              }
              return res.status(200).json({
                content: {
                  cart_subtotal,
                  cart_prod_total,
                  products: response
                }
              })
            }
          )
        })
      }
    )
  })
}

module.exports = {
  insertProduct,
  productBodyExists,
  productAlreadyInserted,
  getCartInfo
}
