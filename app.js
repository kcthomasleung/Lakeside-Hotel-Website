const env = process.env.NODE_ENV || "development"; // for app.js to connect to postgresQL
const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 5000;
const path = require('path') 
// const config = require("./config.js")[env];
const Pool = require("pg").Pool;
const bodyParser = require("body-parser");
const { json, jsonp } = require("express/lib/response");
const req = require("express/lib/request");

const jsonParser = bodyParser.json();

// static file directory
app.use(express.static(path.join(__dirname, "public"))); 
// parse application/json 
app.use(bodyParser.json()); 

//set view engine to use ejs templates
app.set("view engine", "ejs");

// set root page to indes.ejs and pass in the title of the hotel
app.get("/", function (req, res) {
  let title = "Lakeside Hotel";
  res.render("index", { title: title });
});

// render rooms page
app.get("/rooms", (req, res) => {
  res.render("rooms");
});

// render facilities page
app.get("/facilities", (req, res) => {
  res.render("facilities");
});

// render the bookings poge when the URL/bookings is requested
app.get("/bookings", (req, res) => {
  res.render("bookings");
});

// render the payment page
app.get("/payment", (req, res) => {
  res.render("payment_form");
});

// render the confirmation page
app.get("/confirmation", (req, res) => {
  res.render("confirmation")
})

// render the attractions page
app.get("/attractions", (req, res) => {
  res.render("attractions")
})

// render the contact page
app.get("/contact", (req, res) => {
  res.render("contact")
})


// See information for all the bookings
app.get("/view_bookings", async (req, res) => {
  try{
    const pool = new Pool(config)
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
    const pool = new Pool(config)
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

// view all rooms
app.get("/reception", async (req, res) => {
  try{
    const pool = new Pool(config)
    const client = await pool.connect();
    const q = "select * from room;";
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
        res.render('reception', {data:data, count:count})
      }
      });
    } 
    catch (e) {
      console.log(e);
    }
})

// View all customer booking records
app.get("/customer_bookings", async (req, res) => {
  try{
    const pool = new Pool(config)
    const client = await pool.connect();
    const q = `select 
    c.c_no, c_name, c_email, c_address, c_cardtype, c_cardexp, c_cardno, 
    b.b_ref, b_cost, b_outstanding, b_notes, r_no, checkin, checkout
    from customer c join booking b on c.c_no=b.c_no join roombooking r on r.b_ref=b.b_ref`;
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
        data = results.rows;
        count = results.rows.length;
        // res.json({ results: JSON.stringify(data), rows: count });
        res.render('customer_bookings', {data:data, count:count})
      }
      });
    } 
    catch (e) {
      console.log(e);
    }
})

// View specific customer booking records
app.get("/customer_bookings/:customer_name", async (req, res) => {
  const routeParams = req.params;
	const customer_name = routeParams.customer_name
  try{
    const pool = new Pool(config)
    const client = await pool.connect();
    const q = `select 
    c.c_no, c_name, c_email, c_address, c_cardtype, c_cardexp, c_cardno, 
    b.b_ref, b_cost, b_outstanding, b_notes, r_no, checkin, checkout
    from customer c join booking b on c.c_no=b.c_no join roombooking r on r.b_ref=b.b_ref
    where c_name='${customer_name}'`;
    
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
        data = results.rows
        count = results.rows.length;
        res.json({ results: data, rows: count });
      }
      });
    } 
    catch (e) {
      console.log(e);
    }
})


// booking procedure
app.post("/rooms", jsonParser, (req, res) => {
  // store form parameters in variables
  const body = req.body;
  const start_date = body.start_date;
  const finish_date = body.finish_date;
  // decalare a room prices variable that will be modified once a database query has been made
  let room_prices // a list of dictionaries containing price information for all four room types
  // take the body object and get the room key value pairs
  const rooms_list = Object.entries(body).slice(0,4) 

  // declare a requested_rooms list that contains a list of key-value pairs of rooms requested in a list form
  let requested_rooms = [] // list of lists
  for (i in rooms_list){
    if (rooms_list[i][1] != 0){
      requested_rooms.push(rooms_list[i])
    }
  }
  // decalre a boolean variable for whether all rooms requested are available for the specified date
  let all_rm_available = true

  //decalre a global available room list for later access
  let available_rooms_list = []

  //declare a boolean variable to determine whether to send a failure of success response back to the client
  let response_Ok = false

  // declare a function to check if requested rooms are available, if unavailbe, set's all_rm_available to false and send response to notify client
  const checkDB = async () =>{
      // for each type of requested rooms, check against the server and see if there are rooms available for the specified period
      requested_rooms.forEach( async list => {
      // take the list of list and access the first 5 characters of the first element of list i to obtain the room type
        const room_type = list[0].substring(0,5) // a string
        const room_quantity = list[1] // a string

        try{
          const pool = new Pool(config)
          const client = await pool.connect();
          const q = `select * from room where r_class='${room_type}';
          select r.r_no
          from  room r full join roombooking rb 
          on rb.r_no = r.r_no
          where r_class='${room_type}' 
            and checkin between '${start_date}' and '${finish_date}'
            and checkout between '${start_date}' and '${finish_date}'
          group by r.r_no
          order by r.r_no;
          select * from rates`;
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
              // push all the rooms of the specified class into a list
              const all_rooms = []
              for (i in results[0].rows){
                all_rooms.push(results[0].rows[i].r_no)
              }
              // push all occupied rooms into a list
              const occupied_rooms = []
              for (i in results[1].rows){
                occupied_rooms.push(results[1].rows[i].r_no)
              }
              // use all_rooms and occupied_rooms to find out available rooms (filtering duplicates)
              const available_rooms = all_rooms.filter(val => !occupied_rooms.includes(val))

              // push the available_rooms list to the global aggregate list of available rooms for all types of rooms
              available_rooms_list.push(available_rooms)

              // if the number of available rooms are less than the requested amount of rooms, send response to client saying rooms are unavailable
              if (available_rooms.length < room_quantity){
                all_rm_available = false
                res.send("The rooms you selected are unavailable for the selected dates. Please try selecting other rooms or other dates.")
              } 
              // update the room_prices variable by assigning it to the query result
              room_prices = results[2].rows
            }
          })
        }
        catch (e) {
          console.log(e)
        }
      }) 
    }
  
  // declare funciton to insert the requested rooms into the database. 
  const insert = async () =>{
  // if all the requested rooms are available, insert bookings into database tables
  if(all_rm_available == true){
    for (i in requested_rooms){
      const room_type = requested_rooms[i][0].substring(0,5) // a string
      const room_quantity = requested_rooms[i][1] // a string


      // calculate the number of nights the customer is staying
      const date1 = new Date(start_date)
      const date2 = new Date(finish_date)
      const diffTime = Math.abs(date2 - date1);
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // source: https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript  
      
     // calculate the total cost of the stay
      let price
      for (obj in room_prices){
        if (room_prices[obj].r_class == room_type){
          price = room_prices[obj].price
        }
      }
      // run function
      const total_cost = price*nights

      // for each type of room requested, insert into tables (room_quantity) amout of times
      for (let insert = 0; insert < Number(room_quantity); insert++){
        try{
          const pool = new Pool(config)
          const client = await pool.connect();
          const q = `select * from room where r_class='${room_type}';
          DO $$
          declare refno integer;
          begin
            insert into booking (b_cost, b_outstanding, b_notes) values (${total_cost}, ${total_cost}, '') returning b_ref into refno;
            insert into roombooking values(${available_rooms_list[i][i]}, refno,'${start_date}','${finish_date}');
          end $$;`
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
              console.log("Successfully inserted booking into booking and roombooking tables")
              response_Ok = true
            }
          })
      }
      catch (e){
        console.log("Hello, I am the error: " + e)
        response_Ok = false
      }
      }
    }
  }
  }
  // check againt the database first to see if the requested rooms are availble
  checkDB()

  // using timeout because I could not find a solution to stop insert() running before check() function has finished running
  setTimeout(() => {
    insert()
  }, 500) // waits one second before executing insert() 
  setTimeout(() => {
    // if everything was properly inserted, response_Ok should be true --> send response back to client
    if (response_Ok == true){
      res.send("Booking Successful")
    }
  }, 1000)
  }
);



// post request to change the room status
app.post("/change_status", jsonParser, async(req, res) => {
  // get room status and room number from the post request body
  const status = req.body.room_status
  const room_number = req.body.room_number

  // update the room status on the database
  try{
    const pool = new Pool(config)
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

// post request from the reception page to change the outstanding balance of a booking
app.post("/change_outstanding", jsonParser, async(req, res) => {
  const b_ref = req.body.b_ref

  // change the booking with specified b_ref 's outstanding balance to 0
  try{
    const pool = new Pool(config)
    const client = await pool.connect();
    const q = `UPDATE booking SET b_outstanding = 0 WHERE b_ref = ${b_ref};`;
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



// post request from the payment page to add customer information to the database
app.post("/customer_info", jsonParser, async(req, res) => {
  // define variables for all cusomer info
  const full_name = req.body.full_name
  const email = req.body.email
  const card_no = req.body.card_no
  const billing_add = req.body.billing_add
  const card_type = req.body.card_type
  const ex_month = req.body.ex_month
  const ex_year = req.body.ex_year
  const additional_requirements = req.body.additional_requirements

  // combine ex_month and ex_year to make card expiry
  const c_cardexp = `${ex_month}/${ex_year}`

  // insert info into database
  try{
    const pool = new Pool(config)
    const client = await pool.connect();
    const q = `insert into customer values (
            (SELECT COALESCE(MAX(c_no),0) FROM customer) + 1,
            '${full_name}',
            '${email}',
            '${billing_add}',
            '${card_type}',
            '${c_cardexp}',
            '${card_no}');
            update booking 
            set c_no=(SELECT COALESCE(MAX(c_no),0) 
            FROM customer) 
            where c_no is NULL;
            update booking set b_notes='${additional_requirements}' 
            where c_no=(SELECT COALESCE(MAX(c_no),0) FROM customer)`
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
        console.log("Successfully inserted customer info and updated booking table")
        res.send("Successful")
      }
    })
}
catch (e){
  console.log("Hello, I am the error: " + e)
  response_Ok = false
}
})



app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

