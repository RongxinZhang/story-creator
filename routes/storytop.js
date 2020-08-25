const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:storyId", (req, res) => {
    const queryString = `
      SELECT title, 
      content,
      is_complete,
      photo_url,
      stories.created_at AS created_at,
      users.username AS username,
      owner_id,
      storyurl_id
      FROM stories
      JOIN users ON owner_id = users.id
      WHERE stories.storyurl_id = $1
    ;`;

    const queryParams = [
      req.params.storyId
    ];

    return db.query(queryString, queryParams)
      .then(data => {
        const results = data.rows[0];
        // console.log(results)
        res.render('story', { story: results })
      })
  })

  return router;
}