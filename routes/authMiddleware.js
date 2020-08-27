const auth = (db) =>{
  return function(req,res,next) {

    const userName = req.session["username"];

    console.log("--> user:", userName);

    // responds with redirect if no sessions
    if (!userName) {
      res.send({redirect: "/register"});
      return;
    }

    const queryString = `SELECT id FROM users 
    WHERE users.username = $1`;

    db.query(queryString, [ userName ])
      .then(data =>{
        if (data.rows[0]) {
          req.session.userId = data.rows[0].id;
          return next();
        } else {
          return res.redirect('/register');
        }
      });
  };
};


module.exports = auth;