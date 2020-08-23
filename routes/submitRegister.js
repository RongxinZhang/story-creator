/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


const submitRegister = (db) => {
  router.post('/', (req, res) => {
    const queryString = `INSERT INTO users ( username, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *;`

    const inputValue = [
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
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