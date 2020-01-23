var express = require("express");
var exphbs = require("express-handlebars");
var routes = require("./controllers/burgers_controller.js");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

app.use(express.static("public"));

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
