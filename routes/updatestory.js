const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/:storyId', (req, res) => {
    const queryString = `
      SELECT title, content, photo_url, storyurl_id
      FROM stories
      WHERE storyurl_id = $1
    ;`;
    const queryParams = [
      req.params.storyId
    ];

    db.query(queryString, queryParams)
      .then(res => res.rows[0])
      .then(story => {
        // res.send(story).status(200)
        res.render('updatestory', {story: story})
      })
      .catch(err => {
        console.error(err);
        err
        .status(500)
        .send("error: ", err);
      });
  })

  router.post('/:storyId', (req, res) => {
    const queryString = `
      UPDATE stories
      SET title = $1, content = $2, photo_url = $3
      WHERE storyurl_id = $4
    ;`;
    const queryParams = [
      req.body.title,
      req.body.content,
      req.body.photo_url,
      req.params.storyId
    ];
    
    db.query(queryString, queryParams)
      .then(res => res.rows)
      .then(story => {
        res.send("🤗")
      })
      .catch(err => {
        console.error(err);
        res
        .status(500)
        .send("error: ", err);
      })
  })

  return router;
}