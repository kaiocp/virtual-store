const pool = require('../../db/mySQL')

const insertAllProducts = (req, res) => {
  const { cep, products } = req.body
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({ err: 'Connection failed' })
    }
    connection.query()
  })
}

module.exports = {
  insertAllProducts
}
