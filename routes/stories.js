/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const createStory = (db) => {
  router.post("/", (req, res) => {
    let query = `INSERT INTO stories 
      (owner_id, title, content, photo_url)
      VALUES ($1, $2, $3, $4) RETURNING *;`;

    const inputValues = [
      req.body.owner_id,
      req.body.title,
      req.body.content,
      req.body.photo_url
    ];

    console.log(req.body);
    console.log(inputValues);

    db.query(query, inputValues)
      .then(data => {
        const stories = data.rows;
        console.log(stories);
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

module.exports = {createStory};