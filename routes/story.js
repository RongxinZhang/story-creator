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
    let query = ` SELECT contributions.user_id AS user_id, 
                  contributions.user_id AS user_id, 
                  contributions.content AS content, 
                  contributions.created_at AS created_at, 
                  count(contribution_likes.id) AS like_count,
                  users.username AS username
                FROM contributions
                JOIN users ON contributions.user_id = users.id
                LEFT JOIN contribution_likes ON contribution_id = contributions.id
                GROUP BY contributions.id, users.username
                HAVING contributions.story_id = 
                  (SELECT id FROM stories WHERE storyurl_id = $1 )
                ORDER BY contributions.created_at DESC;`;
    const inputValues = [ req.params.storyId ];

    db.query(query, inputValues)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

/**
 * Create a contribution for a story
 * @param {node-postgress} db
 * req.body: content
 */
const createContribution = (db)=>{
  router.post("/:storyId/contributions", (req,res)=>{
    // TODO: should use user session
    const userId = 1;

    let query = `INSERT INTO contributions 
          (user_id, story_id, content)
          VALUES ($1, 
              (SELECT id FROM stories WHERE storyurl_id = $2), 
            $3) RETURNING *;`;

    const inputValues = [ userId, req.params.storyId, req.body.content ];

    db.query(query, inputValues)
      .then(data => {
        console.log(data);
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

/**
 * Create a contribution for a story
 * @param {node-postgress} db
 * req.body: content
 */
const likeContribution = (db)=>{
  router.post("/:storyId/contributions/:contributionId", (req,res)=>{
    // TODO: should use user session
    const userId = 1;

    let query = `INSERT INTO contribution_likes 
          (user_id, contribution_id)
          VALUES ($1, $2) RETURNING *;`;

    const inputValues = [userId, req.params.contributionId];

    db.query(query, inputValues)
      .then(data => {
        console.log(data);
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
/**
 * Create a contribution for a story
 * @param {node-postgress} db
 * req.body: content
 */
// const appendContribution = (db)=>{
//   router.post("/:storyId/contributions/", (req,res)=>{
//     console.log("TEST");
//     // TODO: should use user session
//     const userId = 1;

//     let query = `INSERT INTO contributions
//           (user_id, story_id, content)
//           VALUES ($1,
//               (SELECT id FROM stories WHERE storyurl_id = $2),
//             $3) RETURNING *;`;

//     const inputValues = [ userId, req.params.storyId, req.body.content ];

//     db.query(query, inputValues)
//       .then(data => {
//         console.log(data);
//         res.json(data.rows);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };

module.exports = {
  getContributions,
  createContribution,
  likeContribution
  // appendContribution
};