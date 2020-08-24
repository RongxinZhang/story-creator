// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 3000;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieSession({
  name: 'user_id',
  keys: ['key1']
}));

app.set("view engine", "ejs");
app.use(express.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const storyRoutes = require("./routes/story");
const createRoutes = require("./routes/createstory");
const updateRoutes = require("./routes/updatestory");

/**
 * API ROUTES
 */

app.use("/api/users", usersRoutes(db));

// Route to get contributions
app.use("/api/story", storyRoutes.createContribution(db));
app.use("/api/story", storyRoutes.getContributions(db));

app.use("/api/story", storyRoutes.acceptContribution(db));
app.use("/api/story", storyRoutes.likeContribution(db));
// const storiesRoutes = require("./routes/stories");
// Mount all resource routes

app.use("/new", createRoutes(db));
app.use("/update", updateRoutes(db));
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = app;