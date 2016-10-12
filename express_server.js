var express = require("express");
var app = express();

app.set("view engine", "ejs");

var PORT = process.env.PORT || 8080; // default port 8080

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var urlDatabase = {
  "pppppp": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
  "l9ld44": "www.cbc.ca"
};

function generateRandomString() {
  var randomStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
  return randomStr;
}

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  var templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

app.get("/urls/:id", (req, res) => {
  var templateVars = { shortURL: req.params.id };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  var shortURL = req.params.shortURL;
  var longURL = urlDatabase[shortURL];
  res.redirect(302, longURL);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});