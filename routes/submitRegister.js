/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


const submitRegister = (db) => {
  router.post('/register', (req, res) => {
    const queryString = 'INSERT INTO users(id, username, first_name, last_name, email, password, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;'

    const inputValue = [
      req.body.id,
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
      req.body.created_at
    ];
    db.query(queryString, inputValue)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message })
      })
  })
  return router;
}
module.exports = { submitRegister } ;