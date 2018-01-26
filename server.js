"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const morgan      = require('morgan');

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
const poker = require('./lib/poker.js');

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// post hands from user
app.post("/getHands", (req, res) => {
  const hands = helpers.getRequestData(req.body);

  const response = poker.compareTwoHands(hands[0], hands[1]);
  console.log(response);

  if (response.case === 'a') {
    res.send('Tie!');
  } else if (response.case === 'b') {
    res.send('Hand 2 wins');
  } else if (response.case === 'c') {
    res.send('Hand 3 wins');
 } else {
    res.send('Something went wrong');
 }

});


app.listen(PORT, () => {
  console.log("poker-app listening on port " + PORT);
});
