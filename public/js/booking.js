const booking_form = document.querySelector("#booking_form");

async function onSubmit(e) {
  e.preventDefault();

  const std_d_rm_qty = document.querySelector('#std_d_rm_qty').value;
  const sup_d_rm_qty = document.querySelector('#sup_d_rm_qty').value;
  const std_t_rm_qty = document.querySelector('#std_t_rm_qty').value;
  const sup_t_rm_qty = document.querySelector('#sup_t_rm_qty').value;
  const start_date = document.querySelector('#start_date').value;
  const finish_date = document.querySelector('#finish_date').value;

  const message = {
    std_d_rm_qty: std_d_rm_qty,
    sup_d_rm_qty: sup_d_rm_qty,
    std_t_rm_qty: std_t_rm_qty,
    sup_t_rm_qty: sup_t_rm_qty,
    start_date: start_date,
    finish_date: finish_date,
  };

  const serializedMessage = JSON.stringify(message);

  const fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: serializedMessage,
  };

  // send post request to the server and store the promise in a variable
  const result = await fetch("http://localhost:5000/rooms", fetchOptions);
  
  // get the text of the response and store it in a variable
  const text = await result.text();
  if (text == "Booking Successful"){
    // if the server response is successful --> bring the client to the payments page
    window.location.href="/payment"
  } else{
    // else, print the response
    console.log(text)
    const div = document.createElement("div");
    div.innerHTML = text;
    document.body.appendChild(div);
  }

}

booking_form.addEventListener("submit", onSubmit);
