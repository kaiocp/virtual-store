const pool = require('../../db/mySQL')
const { cepInfo } = require('../cart/cartService')

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
            res.status(201).json({ response })
          }
        )
      })
      .catch(err => {
        res.status(400).json({ err: 'Cep invalido' })
      })
  })
}

module.exports = {
  insertAllProducts
}
