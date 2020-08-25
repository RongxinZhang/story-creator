const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const { getUserByEmail } = require('../lib/data-helpers');

const toSubmit = (db) => {
  router.post("/", (req, res)=> {
    const email = req.body.email;
    const password = req.body.password;
    const user = getUserByEmail(email, db);

    if (req.session.user_id) {
      res.redirect('/stories')
    } else if (getUserByEmail(email, db)) {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            req.session.user_id = user.id;
            res.redirect('/stories')
          } else {
            res.status(403).send("Incorrect Password");
          }
        });
    } else {
      res.status(403).send("Cannot find email");
    }
    // const queryString =`
    //   SELECT * FROM users
    //   WHERE users.email = $1
    //   AND users.password = $2
    // ;`;

    // const inputValue = [
    //   req.body.email,
    //   req.body.password
    // ];
    
    // db.query(queryString, inputValue)
    // .then(data => {
    //   const users = data.rows;
    //   res.json({users});
    // })
    // .catch(err => {
    //   res
    //   .status(500)
    //   .json({ error: err.message });
  //   })
  })
  return router;
}

module.exports = { toSubmit };