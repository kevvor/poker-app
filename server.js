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


function formatHands(resObj) {
  const values = Object.values(resObj)
  const h1 = []
  const h2 = []
  const hands = {}
  let counter = 0

  for (let i = 0; i < values.length; i+=2) {
    let card = {
      rank: values[i],
      suit: values[i+1]
    }
    counter++

    if (counter <= 5) {
      h1.push(card)
    }
    else {
      h2.push(card)
    }
  }
  hands.one = h1;
  hands.two = h2;

  return hands
}

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// post hands from user
app.post("/getHands", (req, res) => {
  console.log('posting /getHands')

  const formatted = formatHands(req.body)

  poker.compareTwoHands(formatted.one, formatted.two)

  res.redirect('/')
})


app.listen(PORT, () => {
  console.log("poker-app listening on port " + PORT);
});
