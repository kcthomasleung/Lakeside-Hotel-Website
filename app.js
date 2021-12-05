const env = process.env.NODE_ENV || "development"; // for app.js to connect to postgresQL
const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 5000;
const config = require("./config.js")[env];
const Pool = require("pg").Pool;
const pool = new Pool(config)
// handling form data
//npm install express-validator
const { body,validationResult } = require('express-validator');
const bodyParser = require("body-parser");
const { response } = require("express");
const jsonParser = bodyParser.json();

// static file directory
app.use(express.static("public")); 
// parse application/json
app.use(bodyParser.json()); 

//set view engine to use ejs templates
app.set("view engine", "ejs");

// set root page to indes.ejs and pass in the title of the hotel
app.get("/", function (req, res) {
  let title = "Lakeside Hotel";
  res.render("index", { title: title });
});

// render the bookings poge when the URL/bookings is requested
app.get("/bookings", (req, res) => {
  res.render("bookings");
});

app.get("/bookings/:ref", (req, res) => {
  res.render("bookings");
});

// See information for all the bookings
app.get("/view_bookings", async (req, res) => {
  try{
    const client = await pool.connect();
    const q = "select * from booking;";
    await client.query(q, (err, results) => {
      if (err) { // error handling
        console.log(err.stack);
        errors = err.stack.split(" at ");
        res.json({
          message:
            "Sorry something went wrong! The data has not been processed " +
            errors[0],
        });
      } else {
        client.release();
        // console.log(results); //
        data = results.rows;
        count = results.rows.length;
        // res.json({ results: JSON.stringify(data), rows: count });
        res.render('view_bookings', {data:data, count:count})
      }
      });
    } 
    catch (e) {
      console.log(e);
    }
})

// View checked out rooms
app.get("/housekeeping", async (req, res) => {
  try{
    const client = await pool.connect();
    const q = "select * from room where r_status='C';";
    await client.query(q, (err, results) => {
      if (err) { // error handling
        console.log(err.stack);
        errors = err.stack.split(" at ");
        res.json({
          message:
            "Sorry something went wrong! The data has not been processed " +
            errors[0],
        });
      } else {
        client.release();
        // console.log(results); //
        data = results.rows;
        count = results.rows.length;
        // res.json({ results: JSON.stringify(data), rows: count });
        res.render('housekeeping', {data:data, count:count})
      }
      });
    } 
    catch (e) {
      console.log(e);
    }
})

// post request from the booking form in the bookings page
app.post("/rooms", jsonParser, async (req, res) => {
  // store form parameters in variables
  const body = req.body;
  const std_d_rm_qty = body.std_d_rm_qty;
  const sup_d_rm_qty = body.sup_d_rm_qty;
  const std_t_rm_qty = body.std_t_rm_qty;
  const sup_t_rm_qty = body.sup_t_rm_qty;
  const start_date = body.start_date;
  const finish_date = body.finish_date;
  // const additional_requirements = body.additional_requirements;

  res.send(
    `POST: std_d_rm_qty: ${std_d_rm_qty} , sup_d_rm_qty: ${sup_d_rm_qty},
    std_t_rm_qty: ${std_t_rm_qty},
    sup_t_rm_qty: ${sup_t_rm_qty},
    start_date: ${start_date},
    finish_date: ${finish_date}`
  );
  }
);

// post request to change the room status
app.post("/change_status", jsonParser, async(req, res) => {
  // get room status and room number from the post request body
  const status = req.body.room_status
  const room_number = req.body.room_number

  // update the room status on the database
  try{
    const client = await pool.connect();
    const q = `UPDATE room SET r_status = '${status}' WHERE r_no = ${room_number};`;
    await client.query(q, (err, results) => {
      if (err) { // error handling
        console.log(err.stack);
        errors = err.stack.split(" at ");
        res.json({
          message:
            "Sorry something went wrong! The data has not been processed " +
            errors[0],
        });
      } else {
        client.release();
        res.json({
          message:"Update Successful"
        })
      }
      });
    } 
    catch (e) {
      console.log(e);
    }
})

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
