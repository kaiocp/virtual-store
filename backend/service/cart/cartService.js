const pool = require('../../db/mySQL')
const express = require('express')

const { calcularPrecoPrazo, consultarCep } = require('correios-brasil')
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
      SUM(product.prod_price  *
      contains_with.prod_total) AS sum,
      SUM(contains_with.prod_total) as total_prod
      FROM contains_with
      JOIN product
      ON contains_with.prod_id = product.prod_id;`,
      (err, res) => {
        const { sum, total_prod } = res[0]

        if (err) {
          return
        }
        pool.releaseConnection(connection)
        pool.getConnection((err, conn) => {
          if (err) {
            return
          }
          conn.query(
            `UPDATE cart set cart_subtotal=?,cart_prod_total=?
             WHERE cart_id = 4;`,
            [sum, total_prod],
            (err, queryResponse) => {
              if (err) {
                return
              }
              pool.releaseConnection(conn)

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
const productNotAlreadyInserted = (req, res, next) => {
  const { prod_id } = req.params
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
const hasValidProperty = (req, res, next) => {
  const requestBody = req.body
  const validProperty = ['prod_id', 'prod_total']
  for (property in requestBody) {
    const isValid = validProperty.some(element => {
      return property === element
    })
    if (!isValid) {
      return res
        .status(400)
        .json({ err: "Your body has some invalid properties' names" })
    }
  }

  next()
}
const hasValidUpdate = (req, res, next) => {
  const requestBody = req.body
  const validProperty = 'prod_total'
  for (property in requestBody) {
    if (property != validProperty) {
      return res
        .status(400)
        .json({ err: "Your body has some invalid properties' names" })
    }
  }
  next()
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
const hasBodyNullValue = (req, res, next) => {
  const bodyRequest = req.body
  for (property in bodyRequest) {
    if (!bodyRequest[property]) {
      return res
        .status(400)
        .json({ err: 'Your body has some invalid property' })
    }
  }
  next()
}
const updateCart = (req, res) => {
  pool.getConnection((err, connection) => {
    const { prod_id } = req
    const { prod_total } = req.body

    if (err) {
      return res.status(500).json({ err: 'Failed to connect' })
    }
    connection.query(
      `UPDATE contains_with SET prod_total = ? WHERE prod_id = ?`,
      [prod_total, prod_id],
      (error, queryResponse) => {
        if (error) {
          res.status(500).json({ err: 'Failed to update' })
        }
        pool.releaseConnection(connection)
        updateCartInfo()
        res
          .status(201)
          .json({ message: `Product ${prod_id} inside cart updated` })
      }
    )
  })
}
const cepInfo = cep_number => {
  let args = {
    sCepOrigem: '40170115',
    sCepDestino: cep_number,
    nVlPeso: '3',
    nCdFormato: '1',
    nVlComprimento: '20',
    nVlAltura: '20',
    nVlLargura: '20',
    nCdServico: ['04510'], //Array com os códigos de serviço
    nVlDiametro: '0'
  }
  return new Promise((resolve, reject) => {
    consultarCep(cep_number)
      .then(response => {
        return calcularPrecoPrazo(args)
      })
      .then(response => {
        resolve(response[0])
      })
      .catch(err => {
        reject(err)
      })
  })
}
const insertCep = (req, res) => {
  const cep_number = req.params['cep_number']
  cepInfo(cep_number)
    .then(response => {
      const { Valor, PrazoEntrega } = response
      res.status(200).json({
        content: {
          shipping_cost: Valor,
          shipping_time: PrazoEntrega
        }
      })
    })
    .catch(err => {
      res.status(400).json({ err: 'Invalid cep' })
    })
}
const deleteCart = (req, res) => {
  const { prod_id } = req.params
  pool.getConnection((err, connection) => {
    const { prod_id } = req
    const { prod_total } = req.body
    if (err) {
      res.status(500).json({ err: 'Failed to connect' })
    }
    connection.query(
      `DELETE FROM contains_with
      WHERE cart_id = 4 AND prod_id = ?
      `,
      [prod_id],
      (error, queryResponse) => {
        if (error) {
          res.status(500).json({ err: 'Failed to update' })
        }
        pool.releaseConnection(connection)
        updateCartInfo()
        res
          .status(201)
          .json({ message: `Product ${prod_id} inside cart deleted` })
      }
    )
  })
}
module.exports = {
  insertProduct,
  productBodyExists,
  productAlreadyInserted,
  getCartInfo,
  hasValidProperty,
  hasValidUpdate,
  updateCart,
  hasBodyNullValue,
  productNotAlreadyInserted,
  insertCep,
  deleteCart,
  updateCartInfo
}
