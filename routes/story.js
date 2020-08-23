/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const getContributions = (db)=>{
  router.get("/:storyId/contributions", (req,res)=>{
    console.log("TESTING");
    let query = `
                SELECT contributions.user_id AS user_id, 
                  contributions.user_id AS user_id, 
                  contributions.content AS content, 
                  contributions.created_at AS created_at, 
                  count(contribution_likes.id) AS like_count,
                  users.username AS username
                FROM contributions
                JOIN users ON contributions.user_id = users.id
                JOIN contribution_likes ON contribution_id = contributions.id
                GROUP BY contributions.id, users.username
                HAVING contributions.story_id = 
                  (SELECT id FROM stories WHERE storyurl_id = $1 )
                ORDER BY contributions.created_at DESC;
                `;
    /**
    * stories
    * {
    *   "id": 1,
            "user_id": 1,
            "contribution_id": 2,
            "created_at": "2020-08-02T00:00:00.000Z"
    * }
    */
    const inputValues = [ req.params.storyId ];

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

module.exports = { getContributions };