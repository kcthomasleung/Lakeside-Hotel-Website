const payment_form = document.querySelector("#payment_form");

async function onSubmit(e) {
  e.preventDefault();

  const full_name = document.querySelector('#full_name').value;
  const email = document.querySelector('#email').value;
  const card_no = document.querySelector('#card_no').value;
  const billing_add = document.querySelector('#billing_add').value;
  const card_type = document.querySelector('input[name="card_type"]:checked').value
  const ex_month_t = document.querySelector('#ex_month');
  const ex_month = ex_month_t.options[ex_month_t.selectedIndex].value
  const ex_year_t = document.querySelector('#ex_year');
  const ex_year = ex_year_t.options[ex_year_t.selectedIndex].value
  const additional_requirements = document.querySelector('#additional_requirements').value;

  const message = {
    full_name: full_name,
    email: email,
    card_no: card_no,
    billing_add: billing_add,
    card_type: card_type,
    ex_month: ex_month,
    ex_year: ex_year,
    additional_requirements: additional_requirements
  };

  console.log(message)

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
  const result = await fetch("http://localhost:5000/customer_info", fetchOptions);
  
//   // get the text of the response and store it in a variable
//   const text = await result.text();
//   if (text == "Booking Successful"){
//     // if the server response is successful --> bring the client to the payments page
//     window.location.href="/payment"
//   } else{
//     // else, print the response
//     console.log(text)
//     const div = document.createElement("div");
//     div.innerHTML = text;
//     document.body.appendChild(div);
//   }

}

payment_form.addEventListener("submit", onSubmit);
