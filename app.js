const env = process.env.NODE_ENV || "development"; // for app.js to connect to postgresQL
const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 5000;
const path = require('path') 
const config = require("./config.js")[env];
const Pool = require("pg").Pool;
const pool = new Pool(config)
const bodyParser = require("body-parser");
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

// view all rooms
app.get("/reception", async (req, res) => {
  try{
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


// post request from the booking form in the bookings page --> insert information into database
// app.post("/rooms", jsonParser, async (req, res) => {
//   // store form parameters in variables
//   const body = req.body;
//   let std_d_rm_qty = body.std_d_rm_qty;
//   let sup_d_rm_qty = body.sup_d_rm_qty;
//   let std_t_rm_qty = body.std_t_rm_qty;
//   let sup_t_rm_qty = body.sup_t_rm_qty;
//   const start_date = body.start_date;
//   const finish_date = body.finish_date;

//   // create a list of rooms required in the form
//   const room_list = []
//   while(std_d_rm_qty > 0){
//     room_list.push("std_d")
//     std_d_rm_qty --
//   }
//   while(sup_d_rm_qty > 0){
//     room_list.push("sup_d")
//     sup_d_rm_qty --
//   }
//   while(std_t_rm_qty > 0){
//     room_list.push("std_t")
//     std_t_rm_qty --
//   }
//   while(sup_t_rm_qty > 0){
//     room_list.push("sup_t")
//     sup_t_rm_qty --
//   }

//   // for each room the customer want to book, check if available, if available, insert booking
//   for(i in room_list){
//     try{
//       const client = await pool.connect();
//       // the query below returns all the rooms (of the same type) that are occupied during that time
//       const q = `select * from room where r_class='${room_list[i]}';
//       select r.r_no
//       from  room r full join roombooking rb 
//       on rb.r_no = r.r_no
//       where r_class='${room_list[i]}' 
//         and checkin between '${start_date}' and '${finish_date}'
//         and checkout between '${start_date}' and '${finish_date}'
//       group by r.r_no
//       order by r.r_no;
//       select price from rates where r_class='${room_list[i]}'`;
//       await client.query(q, (err, results) => {
//         if (err) { // error handling
//           console.log(err.stack);
//           errors = err.stack.split(" at ");
//           res.json({
//             message:
//               "Sorry something went wrong! The data has not been processed " +
//               errors[0],
//           });
//         } else {
//           client.release();
//           // push all the rooms of the specified class into a list
//           const all_rooms = []
//           for (i in results[0].rows){
//             all_rooms.push(results[0].rows[i].r_no)
//           }

//           // push all occupied rooms into a list
//           const occupied_rooms = []
//           for (i in results[1].rows){
//             occupied_rooms.push(results[1].rows[i].r_no)
//           }

//           // if all rooms are occupied, send response 
//           if(all_rooms.length == occupied_rooms.length){
//             res.send("All rooms are unavailable. Please try selecting another room class or date.")
//           }
//           else{
//             // if there are rooms available, select a room for the customer and insert into booking table and roombooking table
//             const available_rooms = all_rooms.filter(val => !occupied_rooms.includes(val))
            
//             // calculate the number of nights the customer is staying
//             const date1 = new Date(start_date)
//             const date2 = new Date(finish_date)
//             const diffTime = Math.abs(date2 - date1);
//             const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // source: https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript  
            
//             // calculate the total cost of the stay
//             const price = results[2].rows[0].price
//             const total_cost = price*nights
            
//             //insert into tables
//             async function insert() {
//               try{
//                 const client = await pool.connect();
//                 const q = `
//                 DO $$
//                 declare refno integer;
//                 begin
//                   insert into booking (b_cost, b_outstanding, b_notes) values (${total_cost}, ${total_cost}, '') returning b_ref into refno;
//                   insert into roombooking values(${available_rooms[0]}, refno,'${start_date}','${finish_date}');
//                 end $$;`
//                 await client.query(q, (err, results) => {
//                   if (err) { // error handling
//                     console.log(err.stack);
//                     errors = err.stack.split(" at ");
//                     res.json({
//                       message:
//                         "Sorry something went wrong! The data has not been processed " +
//                         errors[0],
//                     });
//                   } else {
//                     console.log("Successfully Inserted items")
//                   }
//                 })
//               }
//               catch (e){
//                 console.log(e)
//               }
//             }
//             insert()
//           }
//         }
//         });
//       } 
//       catch (e) {
//         console.log(e);
//       }
//     }
//   }
// );


app.post("/rooms", jsonParser, async (req, res) => {
  // store form parameters in variables
  const body = req.body;
  const start_date = body.start_date;
  const finish_date = body.finish_date;
  // decalare a room prices variable that will be modified once a database query has been made
  let room_prices 
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

  // for each type of requested rooms, check against the server and see if there are rooms available for the specified period
  for (i in requested_rooms){
    // take the list of list and access the first 5 characters of the first element of list i to obtain the room type
    const room_type = requested_rooms[i][0].substring(0,5) // a string
    const room_quantity = requested_rooms[i][1] // a string

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
          console.log('bye')
          console.log(available_rooms_list)

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
  }
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
      for (i in room_prices){
        if (room_prices[i].r_class == room_type){
          price = room_prices[i].price
        }
      }
      // run function
      const total_cost = price*nights

      console.log('hello')

      // for each type of room requested, insert into tables (room_quantity) amout of times
      for (let insert = 0; insert < Number(room_quantity); insert++){
        // console.log(available_rooms_list)
      //   try{
      //     const client = await pool.connect();
      //     const q = `select * from room where r_class='${room_type}';
      //     DO $$
      //     declare refno integer;
      //     begin
      //       insert into booking (b_cost, b_outstanding, b_notes) values (${total_cost}, ${total_cost}, '') returning b_ref into refno;
      //       insert into roombooking values(${available_rooms[0]}, refno,'${start_date}','${finish_date}');
      //     end $$;`
      //     await client.query(q, (err, results) => {
      //       if (err) { // error handling
      //         console.log(err.stack);
      //         errors = err.stack.split(" at ");
      //         res.json({
      //           message:
      //             "Sorry something went wrong! The data has not been processed " +
      //             errors[0],
      //         });
      //       } else {
      //         console.log("Successfully Inserted items")
      //       }
      //     })
      // }
      // catch (e){
      //   console.log(e)
      // }
      }
    }
  }
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
