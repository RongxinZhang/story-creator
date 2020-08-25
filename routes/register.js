const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.user_id) {
      res.redirect('/stories');
    } else {
      res.render('register');
    }
  });
  return router;
}
