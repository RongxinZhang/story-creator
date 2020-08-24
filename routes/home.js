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
    const queryString = `
    SELECT stories.title AS title, 
    stories.is_complete AS status, 
    stories.created_at AS created_at,
    stories.photo_url,
    COUNT(contributions.*) AS total_contributions,
    users.username AS created_by
    FROM stories
    JOIN users ON stories.owner_id = users.id
    LEFT JOIN contributions ON stories.id = contributions.story_id
    GROUP BY stories.id, users.username
    ORDER BY created_at DESC
    ;`;
    return db.query(queryString)
      .then(data => {
        const results = data.rows;
        res.render('stories', { stories: results });
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


