const auth = (db) =>{
  return (req,res,next) => {

    const userName = req.session["username"];

    console.log("--> user:", userName);

    // responds with redirect if no sessions
    if (!userName) {
      console.log("--> auth: not logged in");
      return res.redirect('/register');
      // return res.send({redirect: "/register"});
    }

    const queryString = `SELECT id FROM users 
    WHERE users.username = $1`;

    db.query(queryString, [ userName ])
      .then(data =>{
        if (data.rows[0]) {
          req.session.userId = data.rows[0].id;
          return next();
        } else {
          console.log("--> auth: cannot find user");
          return res.redirect('/register');
        }
      });
  };
};


module.exports = auth;