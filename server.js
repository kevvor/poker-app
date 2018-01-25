"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const morgan      = require('morgan');

const poker = require('./lib/poker.js')
const formatter = require('./lib/app.js')

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Helpers
const helpers = require('./helpers/hands');

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// post hands from user
app.post("/getHands", (req, res) => {
  console.log(req.body)

  helpers.getRequestData(req.body);
  res.redirect('/')
})


app.listen(PORT, () => {
  console.log("poker-app listening on port " + PORT);
});
