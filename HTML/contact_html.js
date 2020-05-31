const electron = require("electron");
const { ipcRenderer } = electron;

// Send the load contacts message to main
function callLoadContacts() {
  console.log("Calling for Contact List");
  ipcRenderer.send("contacts:call");
}

// Loading a list of contacts on the screen
ipcRenderer.on("contacts:load", function (e, rows) {
  var tablebody = document.querySelector("tbody");
  tablebody.innerHTML = "";
  console.log("Log - Contact Table Cleared");
  for (row of rows) {
    console.log("Log - A contact was added!");
    $(table)
      .find("tbody")
      .append(
        "<tr><td>" +
          row.id +
          "</td><td>" +
          row.first_name +
          "</td><td>" +
          row.last_name +
          "</td><td>" +
          row.phone_number +
          "</td><td>" +
          row.email +
          "</td><td><button onclick='editRecord(" +
          row.id +
          ")' class='btn btn-primary' type='submit'>Edit</button></td></tr>"
      );
  }
});

// Call to main to open a new window to edit the record
function editRecord(id) {
  console.log("Log- Record Being Editted - " + id);
  ipcRenderer.send("contact:edit", id);
}

// Load Existing Values into the Edit Screen
ipcRenderer.on("contact:loadEdit", function (e, rows) {
  console.log("Log - Message Received, anyone there?");
  for (row of rows) {
    document.querySelector("form").id = row.id;
    document.getElementById("firstName").value = row.first_name;
    document.getElementById("middleName").value = row.middle_name;
    document.getElementById("lastName").value = row.last_name;
    document.getElementById("phoneNumber").value = row.phone_number;
    document.getElementById("email").value = row.email;
    document.getElementById("skypeID").value = row.skype_id;
  }
  let del = document.createElement("button");
  del.className = "btn btn-danger";
  del.type = "button";
  del.innerHTML = "Delete!";
  del.addEventListener("click", () => {
    deleteContact();
  });
  let form = document.querySelector("form");
  form.appendChild(del);
});

//Submits form to main process. Will update existing record, or create a new record.

const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm() {
  console.log("Log - Form Submit Clicked");
  const id = document.querySelector("form").id;
  const contactSubmit = {
    first_name: document.getElementById("firstName").value,
    middle_name: document.getElementById("middleName").value,
    last_name: document.getElementById("lastName").value,
    phone_number: document.getElementById("phoneNumber").value,
    email: document.getElementById("email").value,
    skype_id: document.getElementById("skypeID").value,
  };

  console.log("Log - Data Being Sent: ", contactSubmit);

  if (id) {
    console.log("Log - Contact ID is: " + id);
    ipcRenderer.send("item:submitEdit", id, contactSubmit);
  } else {
    ipcRenderer.send("item:submitAdd", contactSubmit);
    console.log("Log - Contact ID is: " + id);
  }
}

function deleteContact() {
  if (confirm("Do you really want to delete this contact?")) {
    id = document.querySelector("form").id;
    ipcRenderer.send("contact:delete", id);
  } else {
    return 0;
  }
}
