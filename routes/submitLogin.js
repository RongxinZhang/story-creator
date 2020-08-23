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
    WHERE 
    `
  })
}