const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:storyId", (req, res) => {
    const queryString = `
      SELECT title, 
      content,
      is_complete,
      photo_url,
      stories.created_at,
      users.username
      FROM stories
      JOIN users ON owner_id = users.id
    ;`;

    const queryParams = [

    ];

    return db.query(queryString, queryParams)
      //if not complete
      .then(data => {
        const results = data.rows[0];
        res.render('story', {story: results})
      })
  })

  return router;
}