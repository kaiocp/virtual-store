const pool = require('../../db/mySQL')
const { cepInfo } = require('../cart/cartService')
const hasBodyNullValue = (req, res, next) => {
  const bodyRequest = req.body
  let hasNullValue = false
  for (property in bodyRequest) {
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
const hasInvalidProperty = (req, res, next) => {
  const bodyRequest = req.body
  const validProperty = ['cep', 'products']
  const validProductProperty = ['prod_id', 'prod_total']
  let hasInvalidProperty = false
  for (property in bodyRequest) {
    if (!validProperty.includes(property)) {
      res
        .status(400)
        .json({ error: 'Bad Request', message: 'Invalid property' })
      hasInvalidProperty = true
      return
    }
    if (property === 'cep') {
      if (typeof bodyRequest[property] !== 'string') {
        res
          .status(400)
          .json({ error: 'Bad Request', message: 'Invalid property' })
        hasInvalidProperty = true
        return
      }
    } else {
      if (!Array.isArray(bodyRequest[property])) {
        res
          .status(400)
          .json({ error: 'Bad Request', message: 'Invalid property' })
        hasInvalidProperty = true
        return
      }
      bodyRequest[property].forEach(element => {
        for (elementProperty in element) {
          if (!validProductProperty.includes(elementProperty)) {
            res
              .status(400)
              .json({ error: 'Bad Request', message: 'Invalid property' })
            hasInvalidProperty = true
            return
          }
          if (elementProperty === 'prod_id') {
            if (typeof element[elementProperty] !== 'string') {
              res
                .status(400)
                .json({ error: 'Bad Request', message: 'Invalid property' })
              hasInvalidProperty = true
              return
            }
          } else {
            if (isNaN(element[elementProperty])) {
              res
                .status(400)
                .json({ error: 'Bad Request', message: 'Invalid property' })
              hasInvalidProperty = true
              return
            }
          }
        }
      })
    }
  }
  if (!hasInvalidProperty) {
    next()
  }
}

const insertAllProducts = (req, res) => {
  const { cep, products } = req.body
  pool.getConnection((error, connection) => {
    if (error) {
      res.status(500).json({ err: 'Connection failed' })
    }
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
                    pool.releaseConnection(connection)
                    if (index == array.length - 1) {
                      const answer = updateInfoOrder(order_id)
                    }
                  }
                )
              })
            })
            pool.releaseConnection(connection)

            res
              .status(200)
              .json({ message: `Order created with success`, order_id })
          }
        )
      })
      .catch(err => {
        res.status(400).json({ error: 'Invalid Cep' })
      })
  })
}
const updateInfoOrder = order_id => {
  pool.getConnection((err, connection) => {
    if (err) {
      return err
    }
    connection.query(
      `SELECT SUM(product.prod_price * has_inside.prod_total) + order_final.order_shipping
      as order_total
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
        pool.releaseConnection(connection)
        pool.getConnection((err, connection) => {
          if (err) {
            return err
          }
          connection.query(
            `UPDATE order_final 
          SET order_total
          = ? WHERE order_id = ?`,
            [order_total, order_id],
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

        console.log()
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
module.exports = {
  insertAllProducts,
  hasBodyNullValue,
  hasInvalidProperty,
  getAllOrders,
  getOneOrder
}
