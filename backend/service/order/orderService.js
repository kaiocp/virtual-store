const pool = require('../../db/mySQL')
const { cepInfo } = require('../cart/cartService')
const hasBodyNullValue = (req, res, next) => {
  const bodyRequest = req.body
  let hasNullValue = false
  for (property in bodyRequest) {
    if (property === 'cep') {
      break
    }
    if (Array.isArray(bodyRequest[property])) {
      bodyRequest[property].forEach(element => {
        if (element === null) {
          res.status(400).json({
            error: 'Bad Request',
            message: 'Body request cannot be null'
          })
          hasBodyNullValue = true
          return
        }
        for (elementProperty in element) {
          if (element[elementProperty] === null) {
            res.status(400).json({
              error: 'Bad Request',
              message: 'Body request cannot be null'
            })
            hasNullValue = true
            return
          }
        }
      })
    } else if (bodyRequest[property] === null) {
      res
        .status(400)
        .json({ error: 'Bad Request', message: 'Body request cannot be null' })
      hasNullValue = true
      return
    }
  }
  if (!hasNullValue) {
    next()
  }
}
const prodTotaIsValid = (req, res, next) => {
  const requestBody = req.body
  const bodyKeys = Object.keys(requestBody)
  let hasInvalidProperty = false
  if (bodyKeys.length !== 1) {
    hasInvalidProperty = true
  } else {
    if (bodyKeys.includes('prod_total')) {
      if (
        requestBody.prod_total === null ||
        typeof requestBody.prod_total !== 'number'
      ) {
        hasInvalidProperty = true
      }
    } else {
      hasInvalidProperty = true
    }
  }
  if (hasInvalidProperty) {
    return res
      .status(400)
      .json({ error: 'Bad Request', message: 'Invalid body request' })
  }
  next()
}
const isCepValid = (req, res, next) => {
  const bodyRequest = req.body
  const bodyKeys = Object.keys(bodyRequest)
  let hasInvalidValue = false
  if (bodyKeys.length !== 1) {
    hasInvalidValue = true
  } else {
    if (bodyKeys.includes('cep')) {
      if (bodyRequest.cep === null || typeof bodyRequest.cep !== 'string') {
        hasInvalidValue = true
      }
    } else {
      hasInvalidValue = true
    }
  }
  if (hasInvalidValue) {
    return res
      .status(400)
      .json({ error: 'Bad Request', message: 'Invalid body request' })
  } else {
    next()
  }
}
const hasInvalidProperty = (req, res, next) => {
  const requestBody = req.body
  const upperValidProperty = ['cep', 'products']
  const lowerValidProperty = ['prod_id', 'prod_total']
  let isInvalidProperty = false
  let invalidPropertyName = ''
  for (property in requestBody) {
    if (!upperValidProperty.includes(property)) {
      isInvalidProperty = true
      invalidPropertyName = property
      break
    }
    if (
      property === 'cep' &&
      typeof requestBody[property] !== 'string' &&
      requestBody['cep'] != null
    ) {
      invalidPropertyName = property
      isInvalidProperty = true
      break
    } else if (property === 'products') {
      if (!Array.isArray(requestBody[property])) {
        invalidPropertyName = property
        isInvalidProperty = true
        break
      }
      isInvalidProperty = requestBody[property].some(product => {
        for (productProperty in product) {
          if (typeof product !== 'object') {
            return true
          }
          invalidPropertyName = productProperty
          if (!lowerValidProperty.includes(productProperty)) {
            return true
          }
          if (
            productProperty === 'prod_id' &&
            typeof product[productProperty] !== 'string'
          ) {
            invalidPropertyName = productProperty
            return true
          } else if (
            productProperty === 'prod_total' &&
            typeof product[productProperty] !== 'number'
          ) {
            invalidPropertyName = productProperty
            return true
          }
        }
      })
      if (isInvalidProperty) {
        break
      }
    }
  }
  if (!isInvalidProperty) {
    next()
  } else {
    res.status(400).json({
      error: 'Bad Request',
      message: `Invalid property: ${invalidPropertyName}`
    })
  }
}
const hasInvalidPropertyIntoAlreadyInserted = (req, res, next) => {
  const bodyRequest = req.body

  const upperValidProperty = 'products'
  const lowerValidProperty = ['prod_id', 'prod_total']
  let hasInvalidProperty = false
  for (property in bodyRequest) {
    if (
      property !== upperValidProperty ||
      !Array.isArray(bodyRequest[property])
    ) {
      hasInvalidProperty = true
      break
    }
    const products = bodyRequest[property]
    hasInvalidProperty = products.some(product => {
      if (typeof product !== 'object') {
        return true
      }
      for (property in product) {
        if (!lowerValidProperty.includes(property)) {
          return true
        }
        if (property === 'prod_id' && typeof product[property] !== 'string') {
          return true
        }
        if (
          property === 'prod_total' &&
          (typeof product[property] !== 'number' || product[property] <= 0)
        ) {
          return true
        }
      }
    })
    if (hasInvalidProperty) {
      break
    }
  }
  if (!hasInvalidProperty) {
    next()
  } else {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid property'
    })
  }
}
const hasNullQueryParams = (req, res, next) => {
  const queryParams = req.query
  let hasNullValue = false
  for (property in queryParams) {
    if (queryParams[property] === null) {
      return res
        .status(400)
        .json({ error: 'Bad Request', message: 'Query params cannot be null' })
      hasNullValue = true
    }
  }
  if (!hasNullValue) {
    next()
  }
}
const hasValidDeleteQuery = (req, res, next) => {
  const queryParams = req.query
  const queryLength = Object.keys(queryParams).length
  const validProperty = ['order_id', 'prod_id']
  let hasInvalidProperty = false
  if (queryLength !== 2) {
    hasInvalidProperty = true
  } else {
    for (property in queryParams) {
      if (!validProperty.includes(property)) {
        hasInvalidProperty = true
        break
      }
      if (property === 'order_id') {
        const orderIdValue = Number(queryParams[property])

        if (isNaN(orderIdValue)) {
          hasInvalidProperty = true
          break
        }
      } else {
        if (typeof queryParams[property] !== 'string') {
          hasInvalidProperty = true
          break
        }
      }
    }
  }

  if (hasInvalidProperty) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid query params'
    })
  } else {
    next()
  }
}
const queryOrderIdExists = (req, res, next) => {
  const { order_id } = req.query

  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error connecting to database'
      })
      return
    }
    connection.query(
      `SELECT * from has_inside WHERE order_id = ?`,
      [order_id],
      (err, result) => {
        if (err) {
          res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error connecting to database'
          })
          return
        }
        if (result.length == 0) {
          return res.status(404).json({
            error: 'Not Found',
            message: 'Order not found'
          })
        }
        next()
      }
    )
  })
}
const queryProductIdExists = (req, res, next) => {
  const { prod_id } = req.query

  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error connecting to database'
      })
      return
    }
    connection.query(
      `SELECT * from product WHERE prod_id = ?`,
      [prod_id],
      (err, result) => {
        if (err) {
          res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error connecting to database'
          })
          return
        }
        if (result.length === 0) {
          return res.status(404).json({
            error: 'Not Found',
            message: 'Product not found'
          })
        }
        connection.release()
        next()
      }
    )
  })
}
const queryProductIsInOrder = (req, res, next) => {
  const { order_id, prod_id } = req.query
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error connecting to database'
      })
      return
    }
    connection.query(
      `SELECT * from has_inside WHERE order_id = ? AND prod_id = ?`,
      [order_id, prod_id],
      (err, result) => {
        if (result.length === 0) {
          return res.status(404).json({
            error: 'Not Found',
            message: 'Product not found in order'
          })
        }
        connection.release()
        next()
      }
    )
  })
}
const productInBodyExists = (req, res, next) => {
  const products = req.body.products
  const productIds = products.map(element => element.prod_id)
  pool.getConnection((error, connection) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
    connection.query(
      `SELECT * FROM product WHERE prod_id IN (?)`,
      [productIds],
      (error, results) => {
        connection.release()
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        if (results.length !== productIds.length) {
          return res
            .status(400)
            .json({ error: 'Bad Request', message: 'Invalid product' })
        }
        next()
      }
    )
  })
}
const insertAllProducts = (req, res) => {
  const { cep, products } = req.body

  pool.getConnection((error, connection) => {
    if (error) {
      res.status(500).json({ err: 'Connection failed' })
    }
    if (cep) {
      cepInfo(cep)
        .then(response => {
          const { Valor, PrazoEntrega } = response.shipping
          const {
            localidade: order_city,
            uf: order_state,
            bairro: order_neighborhood,
            logradouro: order_street
          } = response.adressInfo

          connection.query(
            `INSERT INTO order_final

        (cep,order_shipping,order_shipping_time,order_city, order_state, order_neighborhood, order_street) VALUES (?,?,?,?,?,?,?)`,
            [
              cep,
              Valor,
              PrazoEntrega,
              order_city,
              order_state,
              order_neighborhood,
              order_street
            ],
            (err, response) => {
              if (err) {
                res.status(500).json({ err: 'Insert Failed' })
              }
              const order_id = response.insertId
              pool.releaseConnection(connection)
              products.forEach((element, index, array) => {
                const { prod_id, prod_total } = element
                pool.getConnection((err, connection) => {
                  if (err) {
                    res.status(500).json({ error: 'Connection failed' })
                  }
                  pool.query(
                    `INSERT INTO has_inside
                (order_id,prod_id,prod_total) VALUES
                (?,?,?)`,
                    [order_id, prod_id, prod_total],
                    (error, response) => {
                      if (error) {
                        res.status(500).json({ error: 'Insert Failed' })
                      }

                      if (index == array.length - 1) {
                        pool.releaseConnection(connection)

                        const answer = updateInfoOrder(order_id)
                      }
                    }
                  )
                })
              })

              res
                .status(201)
                .json({ message: `Order created with success`, order_id })
            }
          )
        })
        .catch(err => {
          res.status(404).json({ error: 'Not found', message: 'Cep not found' })
        })
    } else {
      connection.query(
        `INSERT INTO order_final

    (cep,order_shipping,order_shipping_time,order_city, order_state, order_neighborhood, order_street) VALUES (?,?,?,?,?,?,?)`,
        [null, 0, 0, null, null, null, null],
        (err, response) => {
          if (err) {
            res.status(500).json({ err: 'Insert Failed' })
          }
          const order_id = response.insertId
          pool.releaseConnection(connection)
          products.forEach((element, index, array) => {
            const { prod_id, prod_total } = element
            pool.getConnection((err, connection) => {
              if (err) {
                res.status(500).json({ error: 'Connection failed' })
              }
              pool.query(
                `INSERT INTO has_inside
            (order_id,prod_id,prod_total) VALUES
            (?,?,?)`,
                [order_id, prod_id, prod_total],
                (error, response) => {
                  if (error) {
                    res.status(500).json({ error: 'Insert Failed' })
                  }

                  if (index == array.length - 1) {
                    pool.releaseConnection(connection)

                    const answer = updateInfoOrder(order_id)
                  }
                }
              )
            })
          })

          res
            .status(201)
            .json({ message: `Order created with success`, order_id })
        }
      )
    }
  })
}
const updateInfoOrder = order_id => {
  pool.getConnection((err, connection) => {
    if (err) {
      return err
    }
    connection.query(
      `SELECT SUM(product.prod_price * has_inside.prod_total) + order_final.order_shipping
      as order_total,SUM(has_inside.prod_total) as order_quantity
    from has_inside
    JOIN product
    ON has_inside.prod_id = product.prod_id
    JOIN order_final
    ON has_inside.order_id = order_final.order_id
    WHERE has_inside.order_id = ?`,
      [order_id],
      (error, response) => {
        if (error) {
          return error
        }
        const { order_total } = response[0]
        const { order_quantity } = response[0]
        pool.releaseConnection(connection)
        pool.getConnection((err, connection) => {
          if (err) {
            return err
          }
          connection.query(
            `UPDATE order_final 
          SET order_total
          = ?,order_quantity = ? WHERE order_id = ?`,
            [order_total, order_quantity, order_id],
            (err, response) => {
              if (err) {
              }
              pool.releaseConnection(connection)
              return 'ok'
            }
          )
        })
        return 'ok'
      }
    )
  })
}
const getAllOrders = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Connection failed' })
    }
    connection.query(
      `SELECT order_id from order_final

    `,
      (err, response) => {
        if (err) {
          return res.status(500).json({ error: 'Get Failed' })
        }

        pool.releaseConnection(connection)

        const result = response.map(element => {
          return {
            order_id: element.order_id,
            order: `https://sleepy-cliffs-93443.herokuapp.com/order/${element.order_id}`
          }
        })

        return res.status(200).json({ result })
      }
    )
  })
}
const getOneOrder = (req, res) => {
  const { order_id } = req.params
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Connection failed' })
    }
    connection.query(
      `SELECT
      has_inside.prod_id,
      product.prod_title,
      product.prod_description,
      product.prod_price,
      product.prod_image_url,
      product_brand.brand_name,
      category.category_name,
      sub_category.subcategory_name,
      product_color.color_name,
      has_inside.prod_total
    from
      has_inside
     
      JOIN product ON has_inside.prod_id = product.prod_id
      JOIN product_brand ON has_inside.prod_id = product_brand.prod_id
      JOIN category ON has_inside.prod_id = category.prod_id
      JOIN sub_category ON has_inside.prod_id = sub_category.prod_id
      JOIN product_color ON has_inside.prod_id = product_color.prod_id
      
     WHERE has_inside.order_id = ?
     ORDER BY product.prod_register_time;`,
      [order_id],
      (err, products) => {
        if (err) {
          return res.status(500).json({ error: 'Get Failed' })
        }
        pool.releaseConnection(connection)
        pool.getConnection((err, connection) => {
          if (err) {
            return res.status(500).json({ error: 'Connection failed' })
          }
          connection.query(
            `SELECT * from order_final
          WHERE
          order_id = ?;`,
            [order_id],
            (err, response) => {
              if (err) {
                return res.status(500).json({ error: 'Get Failed' })
              }
              pool.releaseConnection(connection)
              const orderInfo = response[0]
              return res.status(200).json({ orderInfo, products })
            }
          )
        })
      }
    )
  })
}
const productIsAlreadyInOrder = (req, res, next) => {
  const { order_id } = req.params
  const { products } = req.body
  const products_id = products.map(element => {
    return element.prod_id
  })
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Connection failed' })
    }
    connection.query(
      'SELECT * from has_inside WHERE order_id = ? and prod_id IN (?)',
      [order_id, products_id],
      (err, response) => {
        if (err) {
          return res.status(500).json({ error: 'Get Failed' })
        }
        if (response.length > 0) {
          return res.status(400).json({
            error: 'Bad request',
            message: 'Some of the products are already in order'
          })
        }
        pool.releaseConnection(connection)
        next()
      }
    )
  })
}
const updateOrderInfoProperties = (req, res) => {
  const { order_id } = req.params
  const { cep } = req.body
  cepInfo(cep)
    .then(response => {
      const { Valor, PrazoEntrega } = response.shipping
      const {
        localidade: order_city,
        uf: order_state,
        bairro: order_neighborhood,
        logradouro: order_street
      } = response.adressInfo
      pool.getConnection((err, connection) => {
        if (err) {
          return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Connection failed'
          })
        }
        connection.query(
          `UPDATE order_final SET
        cep = ?,
        order_shipping = ?,
        order_shipping_time = ?,
        order_city = ?,
        order_state = ?,
        order_neighborhood = ?,
        order_street = ?
        WHERE order_id = ?`,
          [
            cep,
            Valor,
            PrazoEntrega,
            order_city,
            order_state,
            order_neighborhood,
            order_street,
            order_id
          ],
          (err, response) => {
            if (err) {
              return res.status(500).json({
                error: 'Internal Server Error',
                message: 'Update failed'
              })
            }
            updateInfoOrder(order_id)
            connection.release()
            return res.status(200).json({
              message: 'Update successful'
            })
          }
        )
      })
    })
    .catch(err => {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Cep not found'
      })
    })
}
const insertToAlreadyExistOrder = (req, res) => {
  const { order_id } = req.params
  const { products } = req.body
  products.forEach((element, index, array) => {
    const { prod_id, prod_total } = element
    pool.getConnection((err, connection) => {
      if (err) {
        res.status(500).json({ error: 'Connection failed' })
      }
      pool.query(
        `INSERT INTO has_inside (order_id,prod_id,prod_total) VALUES (?,?,?)`,
        [order_id, prod_id, prod_total],
        (error, response) => {
          if (error) {
            res.status(500).json({ error: 'Insert Failed' })
          }
          if (index == array.length - 1) {
            pool.releaseConnection(connection)
            const answer = updateInfoOrder(order_id)
          }
        }
      )
    })
  })
  res.status(201).json({ message: 'Products inserted' })
}
const orderIdIsValid = (req, res, next) => {
  const { order_id } = req.params

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Connection failed' })
    }
    connection.query(
      `SELECT * from order_final WHERE order_id = ?`,
      [order_id],
      (err, response) => {
        connection.release()
        if (err) {
          return res.status(500).json({ error: 'Get Failed' })
        }
        if (response.length == 0) {
          return res.status(404).json({
            error: 'Not Found',
            message: 'Order not found'
          })
        }
        next()
      }
    )
  })
}
const deleteProductFromOrder = (req, res) => {
  const { order_id, prod_id } = req.query
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error connecting to database'
      })
    }
    connection.query(
      `DELETE FROM has_inside WHERE order_id = ? and prod_id = ?`,
      [order_id, prod_id],
      (err, response) => {
        if (err) {
          return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Delete failed'
          })
        }
        pool.releaseConnection(connection)
        updateInfoOrder(order_id)
        return res.status(200).json({
          message: `Product with id ${prod_id} deleted from order with id ${order_id}`
        })
      }
    )
  })
}
const deleteOrder = (req, res) => {
  const { order_id } = req.params
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Connection failed' })
    }
    connection.query(
      `DELETE FROM order_final WHERE order_id = ?`,
      [order_id],
      (err, response) => {
        if (err) {
          return res.status(500).json({ error: 'Delete Failed' })
        }
        pool.releaseConnection(connection)
        return res.status(200).json({
          message: `Order with id ${order_id} deleted`
        })
      }
    )
  })
}
const updateProdTotal = (req, res) => {
  const { order_id, prod_id } = req.query
  const { prod_total } = req.body
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error connecting to database'
      })
    }
    connection.query(
      'UPDATE has_inside SET prod_total = ? WHERE order_id = ? and prod_id = ?',
      [prod_total, order_id, prod_id],
      (err, response) => {
        if (err) {
          return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Update failed'
          })
        }
        pool.releaseConnection(connection)
        updateInfoOrder(order_id)
        return res.status(200).json({
          message: `Product with id ${prod_id} updated in order with id ${order_id}`
        })
      }
    )
  })
}

module.exports = {
  insertAllProducts,
  hasBodyNullValue,
  hasInvalidProperty,
  getAllOrders,
  getOneOrder,
  productInBodyExists,
  insertToAlreadyExistOrder,
  productIsAlreadyInOrder,
  hasInvalidPropertyIntoAlreadyInserted,
  orderIdIsValid,
  deleteProductFromOrder,
  hasNullQueryParams,
  hasValidDeleteQuery,
  queryOrderIdExists,
  queryProductIdExists,
  queryProductIsInOrder,
  deleteOrder,
  isCepValid,
  updateOrderInfoProperties,
  prodTotaIsValid,
  updateProdTotal
}
