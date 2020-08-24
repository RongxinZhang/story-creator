/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const toSubmit = (db) =>{
  router.post("/", (req, res)=>{
    const queryString =`
    SELECT * FROM users 
    WHERE  users.email = $1
     AND users.password = $2;
    `;
    const inputValue = [
      req.body.email,
      req.body.password
    ];
    
    db.query(queryString, inputValue)
    .then(data=>{
      console.log(req.body);
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