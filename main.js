const electron = require("electron");
const contacts = require("./contacts.js");
const electronWindows = require("./electronWindows.js");

const { app, ipcMain } = electron;

let mainWindow;
let addWindow;

// Create the main window/DOM
app.on("ready", async function () {
  mainWindow = electronWindows.createMainWindow.createMainWindow();
});

// Catch contact edit request
ipcMain.on("contact:edit", function (err, id) {
  console.log("Log - Edit call received");

  // Ensure the user only opens one edit window at a time
  if (addWindow === undefined) {
    // If the user is editing an existing record, there is an ID. Open edit window and load information.
    if (id) {
      addWindow = electronWindows.newElectronWindow.createAddWindow();
      addWindow.webContents.on("did-finish-load", () => {
        contacts.loadEditContact(addWindow, id);
      });
      // Garbage colletion handle closing window
      addWindow.on("close", function () {
        addWindow = undefined;
      });

      // If there is no id, then it is a new contact, just open a blank contact window.
    } else {
      addWindow = electronWindows.newElectronWindow.createAddWindow();

      // Garbage colletion handle
      addWindow.on("close", function () {
        addWindow = undefined;
      });
    }
  } else {
    return 1;
  }
});

// Catch contacts:call
ipcMain.on("contacts:call", function (err) {
  contacts.loadContacts(mainWindow);
  console.log("Log - Main Received Message");
});

// Catch Editing an existing contact
ipcMain.on("item:submitEdit", function (err, id, contactSubmit) {
  console.log(
    "Log - Main Received Message - Contact Name: ",
    contactSubmit.first_name
  );
  const editContact = async () => {
    let promise = await contacts.submitContactEdit(err, id, contactSubmit);
    addWindow.close();
    contacts.loadContacts(mainWindow);
  };

  editContact();
});

// Catch Adding a New Contact
ipcMain.on("item:submitAdd", function (err, contactSubmit) {
  console.log(
    "Log - Main Received Message - Contact Name: ",
    contactSubmit.first_name
  );
  const addContact = async () => {
    let promise = await contacts.submitContactAdd(err, contactSubmit);
    addWindow.close();
    contacts.loadContacts(mainWindow);
  };

  addContact();
});

// Catch Deleting a contact
ipcMain.on("contact:delete", function (err, id) {
  console.log("Log - Main Received Message - Deleting Contact ID : ", id);
  // Delete the contact specified using Knex
  const delContact = async () => {
    let promise = await contacts.deleteContact(err, id);
    addWindow.close();
    contacts.loadContacts(mainWindow);
  };

  delContact();
});
