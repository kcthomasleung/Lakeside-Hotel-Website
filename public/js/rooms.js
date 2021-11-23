const book_now = document.querySelector(".book-now");

async function onClick(e) {
  //   const room_type = document.querySelector();
  const result = await fetch("http://localhost:5000/rooms");
  const text = await result.text();
  const div = document.createElement("div");
  if (text === "available") {
    div.innerHTML = "room is available";
    document.body.appendChild(div);
  } else if (text === "not available") {
    div.innerHTML = "room is available";
    document.body.appendChild(div);
  } else {
    console.log("Error: invalid response");
  }
}

booking_form.addEventListener("click", onClick);
