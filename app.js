const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const ejs = require("ejs");

const PORT = 5000;

app.use(express.static("public"));
app.use(bodyParser.json());

//set view engine to use ejs templates
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let title = "Lakeside Hotel";
  res.render("index", { title: title });
});

app.get("/rooms", function (req, res) {
  res.render("rooms");
});

app.get("/bookings", (req, res) => {
  res.render("bookings");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
