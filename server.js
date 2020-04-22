// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var todos_data = [
  { id: 1, item: "Đi chợ" },
  { id: 2, item: "Nấu ăn" },
  { id: 3, item: "Rửa bát" },
  { id: 4, item: "Học code tại CodersX" }
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (request, response) => {
  response.render("todos/index", {
    todos: todos_data
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var arrMatch = todos_data.filter(todo_item => {
    return (
      todo_item.item
        .toLowerCase()
        .normalize("NFC")
        .indexOf(q.toLowerCase().normalize("NFC")) !== -1
    );
  });

  res.render("todos/index", {
    todos: arrMatch
  });
});

app.get("/todos/create", (req, res) => {
  res.render("todos/create")
});

app.post("/todos/create", (req, res) => {
  todos_data.push(req.body);

  res.render("todos/index", {
    todos: todos_data
  });
  
  req.redirect('/todos')
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
