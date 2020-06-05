const electron = require("electron");
const { ipcRenderer } = electron;
const ahkExecScripts = require("../AutoHotKey/AHK_calls/ahkExecScripts.js");

// Send the load contacts message to main
function callLoadContacts() {
  console.log("Calling for Contact List");
  ipcRenderer.send("contacts:call");
}

// Catches the query results of contacts. Then determines which page is loaded and calls the appropriate contact load function.
ipcRenderer.on("contacts:load", function (e, db_rows) {
  var rows = db_rows;
  if (document.querySelector("HTML").id === "contact.html") {
    loadContactEditList(rows);
  } else if (document.querySelector("HTML").id === "call_list.html") {
    loadCallList(rows);
  } else if (document.querySelector("HTML").id === "index.html") {
    loadFavList(rows);
  }
});

// Populates the contact maintenance screen. Users can add, edit, or delete contacts here.
function loadContactEditList(rows) {
  var tablebody = document.querySelector("tbody");
  tablebody.innerHTML = "";
  console.log("Log - Contact Table Cleared");
  for (row of rows) {
    console.log("Log - A contact was added!");
    $(table)
      .find("tbody")
      .append(
        "<tr><td>" +
          row.first_name +
          "</td><td>" +
          row.last_name +
          "</td><td>" +
          row.phone_number +
          "</td><td>" +
          row.email +
          "</td><td>" +
          row.skype_id +
          "</td><td><button onclick='editRecord(" +
          row.id +
          ")' class='btn btn-primary' type='submit'>Edit</button></td></tr>"
      );
  }
}

// Populates the call list. Intentionally simple, users may have cognitive or motor disabilities.
function loadCallList(rows) {
  let callList = document.getElementById("callList");
  for (row of rows) {
    let contactInfo = callerID(row);
    console.log("Log - Adding contact to Call List");
    let nextContact = document.createElement("a");
    nextContact.innerHTML = row.first_name + " " + row.last_name;
    nextContact.className =
      "list-group-item list-group-item-info list-group-item-action";
    nextContact.href = "skype:" + contactInfo[0] + "?call&amp;video=true";
    nextContact.onclick = () => {
      ahkExecScripts.startCall(contactInfo[1]);
    };
    callList.appendChild(nextContact);
  }
}

// Populates the Favorites Contact list on the home screen.
// Intentionally simple, users may have cognitive or motor disabilities.
function loadFavList(rows) {
  let callList = document.getElementById("callList");
  let count = "0";
  for (row of rows) {
    let contactInfo = callerID(row);
    console.log("Log - Favorite T/F", row.fav);
    if (row.fav === "1") {
      console.log("Log - Adding contact to Call List");
      let nextContact = document.createElement("a");
      nextContact.innerHTML = row.first_name + " " + row.last_name;
      nextContact.className =
        "list-group-item list-group-item-info list-group-item-action";
      nextContact.href = "skype:" + contactInfo[0] + "?call&amp;video=true";
      nextContact.onclick = () => {
        ahkExecScripts.startCall(contactInfo[1]);
      };
      callList.appendChild(nextContact);
      count++;
    }
  }
  if (count === "0") {
    document.getElementById("hideFavorites").innerHTML = "";
  }
}

// Call to main to open a new window to edit the contact record
function editRecord(id) {
  console.log("Log- Record Being Editted - " + id);
  ipcRenderer.send("contact:edit", id);
}

// Load Existing Contact information into the Edit Screen
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
    document.getElementById("pref").value = row.pref;
    if (row.fav === "1") {
      document.getElementById("fav").checked = row.fav;
    }
  }
  let del = document.createElement("button");
  del.className = "btn btn-danger";
  del.type = "button";
  del.innerHTML = "Delete!";
  del.addEventListener("click", () => {
    deleteContact();
  });
  let form = document.querySelector("#submit");
  form.appendChild(del);
});

//Submits contact update/add form to main process. Will update existing record, or create a new record.
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
    pref: document.getElementById("pref").value,
    fav: document.getElementById("fav").checked,
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

// Deletes an existing contact
// TODO - Add deletion event to history table???
function deleteContact() {
  if (confirm("Do you really want to delete this contact?")) {
    id = document.querySelector("form").id;
    ipcRenderer.send("contact:delete", id);
  } else {
    return 0;
  }
}

//Determine if skype or phone # is to be called.
function callerID(row) {
  var contact;
  var method;
  console.log("Log - Skype ID is: " + row.skype_id);
  console.log("Log - Phone Number is: " + row.phone_number);
  console.log("Log - Preferred Contact Method:", row.pref);
  // preference is logged as skype, and there is an id
  if (
    row.pref === "Skype" &&
    row.skype_id !== null &&
    row.skype_id !== "" &&
    row.skype_id !== undefined
  ) {
    contact = row.skype_id;
    method = "skype";
    // preference is logged as phone, and there is a number.
  } else if (
    row.pref === "Phone Number" &&
    row.phone_number !== null &&
    row.phone_number !== "" &&
    row.phone_number !== undefined
  ) {
    contact = row.phone_number;
    method = "phone";
    // there is no preference
  } else if (
    row.skype_id === null ||
    row.skype_id === "" ||
    row.skype_id === undefined
    // if there is no skype id call phone.
  ) {
    contact = row.phone_number;
    method = "phone";
    // if there is a skype id, call skype
  } else {
    contact = row.skype_id;
    method = "skype";
  }

  console.log("Log - Contact ID is: " + contact);
  return [contact, method];
}
