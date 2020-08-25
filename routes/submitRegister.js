const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const { getUserByEmail } = require('../lib/data-helpers');

const submitRegister = (db) => {
  router.post('/', (req, res) => {
    const queryString1 =`SELECT username FROM users WHERE username =$1;`
    const inputField1 = [req.body.username];
     db.query(queryString1, inputField1)
     .then(data => {
      const users = data.rows;
      if (data.rows[0]) {
        res.send("error: duplicate username");
      } else {

        const queryString = `
        INSERT INTO users 
        (username, first_name, last_name, email, password)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
        ;`;

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
      }
    })
  
  })
  return router;
}
module.exports = { submitRegister } ;