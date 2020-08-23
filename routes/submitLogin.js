/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const toSubmit = (db) =>{
  router.post("/login", (req, res)=>{
    const queryString =`
    SELECT * FROM users 
    WHERE $1 IN (SELECT id FROM users) AND
    $2 IN (SELECT username FROM users) AND
    $3 IN (SELECT email FROM users) AND
    $4 IN (SELECT password FROM users)
    `;
    const inputValue=[
      req.body.id,
      req.body.username,
      req.body.email,
      req.body.password
    ];
    
    db.query(queryString, inputValue)
    .then(data=>{
      const users = data.rows;
      res.json({users});
    })
    .catch(err=>{
      res
      .status(500)
      .json({ error: err.message });
    })
  })
  return router;
}

module.exports = { toSubmit };