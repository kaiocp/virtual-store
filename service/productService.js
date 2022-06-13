const express = require('express')
const mysql = require('mysql2')
const pool = require('../db/mySQL')

const getProducts = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    connection.query('SELECT * FROM products', (err, response) => {
      if (err) {
        return res.status(500).json({ err: err })
      } else {
        return res
          .status(201)
          .json({ message: 'Current products', content: response })
        pool.releaseConnection(connection)
      }
    })
  })
}
module.exports = {
  getProducts
}
