const express = require('express');
const router  = express.Router();

const toLogin = (db) => {
  router.get("/", (req, res) => {
    res.render('login');
  })
  return router;
}

module.exports = { toLogin };