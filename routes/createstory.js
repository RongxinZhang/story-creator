const express = require('express');
const router  = express.Router();
const { generateRandomId } = require('../lib/data-helpers.js');

module.exports = (db) => {
  
  // render create story form
  router.get("/", (req, res) => {
    res.render('createstory');
  });
    
  router.post("/story", (req, res) => {
    // const user_id = req.session.user_id;
    //dummy owner_id
    const user_id = 1;
    // addStory({...req.body, owner_id: user_id})
    const queryString = `
    INSERT INTO stories (
      owner_id, 
      title,
      content,
      photo_url,
      storyurl_id
    )
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *
    ;`;
    // console.log(req.body);

    const queryParams = [
      user_id,
      req.body.title,
      req.body.content,
      req.body.photo_url,
      generateRandomId(6)];
    
    console.log(queryString, queryParams)
    db.query(queryString, queryParams)
      .then(res => res.rows)
      .then(story => {
        res
        // .json(story.rows)
        .status(200)
        .redirect('/new');
      })
      .catch(err => {
        console.error(err);
        res
        .status(500)
        .send("error: ", err);
      });
  });

  return router;
}