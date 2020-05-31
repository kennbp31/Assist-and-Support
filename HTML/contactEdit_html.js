const electron = require("electron");
const { ipcRenderer } = electron;

console.log("WTF mate?");

// Load Existing Values into the Edit Screen
ipcRenderer.on("contact:display", function (e, rows) {
  console.log("Log - Message Received, anyone there?");
  for (row of rows) {
    console.log("Log - Adding to edit screen, " + row.first_name);
    let firstName = document.getElementById("firstName");
    console.log("Log - First Name Element Object: ", firstName);
    firstName.value = row.first_name;
    let middleName = document.getElementById("middleName");
    let lastName = document.getElementById("lastName");
    let phoneNumber = document.getElementById("phoneNumber");
    let email = document.getElementById("email");
    let skypeID = document.getElementById("skypeID");
  }
});
