const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Express app listening on port 3000...");
});
