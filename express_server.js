var express = require("express");
var app = express();

app.set("view engine", "ejs");

var cookieParser = require("cookie-parser");
app.use(cookieParser());

var PORT = process.env.PORT || 8080; // default port 8080

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var urlDatabase = {
  "pppppp": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
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
  var templateVars = { urls: urlDatabase , username: req.cookies["username"] };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  var templateVars = {username: req.cookies["username"]};
  res.render("urls_new", templateVars);
});

app.post("/urls", (req, res) => {
  urlDatabase[generateRandomString()] = req.body.addedLongURL;
  res.redirect('/urls');
});

app.get("/urls/:id", (req, res) => {
  var longURL = urlDatabase[req.params.id];
  var templateVars = { shortURL: req.params.id, website: longURL };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  var shortURL = req.params.shortURL;
  var longURL = urlDatabase[shortURL];
  res.redirect(302, longURL);
});

//delete short and long urls
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect(302, "/urls");
});

//update long url
app.post("/urls/:id/update", (req, res) => {
  var longURLreplace = req.body.longURLreplace;
  var id = req.params.id;
  urlDatabase[id] = longURLreplace;
  res.redirect(302, "/urls");
});

//pass username to pages with headers
//var templateVars = {
  //username: req.cookies["username"]
  //password: req.cookies["password"],
//};
//res.render("index", templateVars);
//res.render("urls_new", templateVars);

//track and show login

app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect(302, "/");
});

app.post("/logout", (req, res) =>{
  res.clearCookie("username", req.body.username);
  res.redirect(302, "/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});