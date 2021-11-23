const booking_form = document.querySelector("#booking_form");

async function onSubmit(e) {
  e.preventDefault();
  //   const room_type = document.querySelector();
  const result = await fetch("http://localhost:5000/rooms");
  const text = await result.text();
  const div = document.createElement("div");
  div.innerHTML = text;
  document.body.appendChild(div);
}

booking_form.addEventListener("submit", onSubmit);
