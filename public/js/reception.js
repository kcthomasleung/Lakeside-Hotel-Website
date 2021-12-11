// get an array of room status td elements
const room_status_elements = document.getElementsByClassName("room_status")
const p = document.querySelector("p")

// when the table cell element is clicked, change its innerHYML
const onClickStatus = (e) => {
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

const onSubmitSelection = (e) => {
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

// function for after search button to search for customer info has been clicked
const onSearch = async (e) => {
    e.preventDefault()
    const customer_name = document.querySelector('#customer_name').value;
    const response = await fetch(`/customer_bookings/${customer_name}`)
    const json = await response.json()
    const data = json.results
    const count = json.rows

    // dynamically generate a table
    const table = document.querySelector('#customer_info_table')
    const headerRow = document.createElement('tr')
    // create a list of headers for the table so we can loop through them
    const headers = ['Customer Number', 'Customer Name', 'Customer Email', 'Customer Address', 'Card Type', 'Card Expiry', 'Card Number', 'Booking Reference', 'Booking Cost', 'Outstanding', 'Notes', 'Room Number', 'Checkin Date', 'Checkout Date']
    
    // loop through each header and create a th element for each, then append it to a the headerRow tr element
    headers.forEach(headerText => {
        const header = document.createElement('th')
        const textNode = document.createTextNode(headerText)
        header.appendChild(textNode)
        headerRow.appendChild(header)
    })
    
    // after adding all the table headers to the headerRow element, append headerRow to the table
    table.appendChild(headerRow)

    // loop throught data from the server and assingn each of them to td element
    data.forEach(booking => {
        // create a table row for each data row
        const table_row = document.createElement('tr')
        // for each object in the list, take the text value of each of the attributes and create a td element with it
        Object.values(booking).forEach(text => {
            const cell = document.createElement('td')
            const textNode = document.createTextNode(text)
            cell.appendChild(textNode)
            // append each cell to the table row
            table_row.appendChild(cell)
        })
        table.appendChild(table_row)
    })
}

const onClickTable = (e) => {
    const elements = document.querySelectorAll("#customer_info_table td:nth-of-type(10)")
    elements.forEach(currentValue => {
        if(e.target == currentValue){
            e.target.innerHTML = "0"
        }
    })
}

// function to submit changes to the outstnading balance
const onConfirmChangeClick = (e) => {
    const elements = document.querySelectorAll("#customer_info_table td:nth-of-type(10)")
    elements.forEach(currentValue => {
        if (currentValue.innerHTML == "0"){
            // obtain the b_ref of the booking that just got changed
            const b_ref = currentValue.parentElement.cells[7]
            // send a post request to the server to change the outstanding balance
            fetch("/change_outstanding", {method: "POST",
            headers:{
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({
                b_ref: b_ref.innerHTML,
                balance: "0"})
        }).then(onResponse, onError)
        }
    })
}

// for each td element in the room status column, add eventListener
Array.from(room_status_elements).forEach(function(element) {
    element.addEventListener('click', onClickStatus);
  });

const submit_button = document.querySelector("#submit-button")
submit_button.addEventListener('click', onSubmitSelection)


const search_button = document.querySelector("#search-button")
search_button.addEventListener('click', onSearch)

const table = document.querySelector('#customer_info_table')
table.addEventListener('click', onClickTable)

const confirm_change_button = document.querySelector('.confirm_button')
confirm_change_button.addEventListener('click', onConfirmChangeClick)
