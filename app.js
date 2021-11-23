import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

const jsonParser = bodyParser.json();

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/bookings", (req, res) => {
  res.send("You have requested to see the rooms");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
