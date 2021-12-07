// get an array of room status td elements
const room_status_elements = document.getElementsByClassName("room_status")
const submit_button = document.querySelector("#submit-button")
const p = document.querySelector("p")

// when the element is clicked, change its innerHYML
const onClick = (e) => {
    const status = e.currentTarget.innerHTML
    if(status == "C"){
        e.currentTarget.innerHTML = "X"
    }
    else if(status == "X"){
        e.currentTarget.innerHTML = "A"
    }
    else if(status == "A"){
        e.currentTarget.innerHTML = "C"
    }
    else{
        alert("Error: Status invalid")
    }
}

const processJSON = (json) => {
    p.innerHTML = json.message
}

const onResponse = (response) => {
    console.log(response.status);
    response.json().then(processJSON)
}

const onError = (error) => {
    console.log(error)
}

const onButtonClick = (e) => {
    // when the submit selection button is clicked, loop through all room_status elements to see whether the room status has been changed from "C"
    Array.from(room_status_elements).forEach(function(element) {
        // if the room status is not checked out, assingn the room number to a variable
        const room_number = element.previousElementSibling
        if(element.innerHTML == "X"){
            fetch("/change_status", {method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                }, 
                body:JSON.stringify({
                    room_number: room_number.innerHTML,
                    room_status: "X"})
            }).then(onResponse, onError)
        }
        
        else if(element.innerHTML == "A"){
            fetch("/change_status", {method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                }, 
                body:JSON.stringify({
                    room_number: room_number.innerHTML,
                    room_status: "A"})
            }).then(onResponse, onError)
        }

        else if(element.innerHTML == "C"){
            fetch("/change_status", {method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                }, 
                body:JSON.stringify({
                    room_number: room_number.innerHTML,
                    room_status: "C"})
            }).then(onResponse, onError)
        }
      });
}

// for each td element in the room status column, add eventListener
Array.from(room_status_elements).forEach(function(element) {
    element.addEventListener('click', onClick);
  });

submit_button.addEventListener('click', onButtonClick)


