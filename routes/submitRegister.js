/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const submitRegister = (db) => {
  router.post('/', (req, res) => {
    const queryString1 = `SELECT username FROM users WHERE username =$1;`;
    const queryString2 = `INSERT INTO users ( username, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5)
        RETURNING *;`;
    const inputField1 = [req.body.username];
    
    db.query(queryString1, inputField1)
      .then(data => {
        if (data.rows[0]) {
          throw (Error("error: duplicate username"));
        }

        const passwordHash = bcrypt.hashSync(req.body.email, SALT_ROUNDS);

        const inputValue = [
          req.body.username,
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          passwordHash
        ];

        return db.query(queryString2, inputValue);
      })
      .then(data => {
        // res.json({userCreated: true });
        res.json({data});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
module.exports = { submitRegister };