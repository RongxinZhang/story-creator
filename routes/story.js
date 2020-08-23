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
    let query = `
                SELECT contributions.* 
                FROM stories
                JOIN contributions ON story_id = stories.id
                JOIN contribution_likes ON contribution_id = contributions.id
                WHERE stories.id = $1
                ORDER BY contributions.created_at DESC;
                `;

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