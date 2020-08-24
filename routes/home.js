/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT * FROM users 
    JOIN stories ON users.id = stories.owner_id 
    JOIN contributions ON users.id = contributions.user_id 
    JOIN contribution_likes ON users.id = contribution_likes.user_id
    ;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
  
};


