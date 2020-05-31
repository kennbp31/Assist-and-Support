const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain } = electron;

let knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./main.db",
  },
  useNullAsDefault: true,
});

var contacts = {
  // Refresh the data on the page
  loadContacts: function (mainWindow) {
    let result = knex.select("*").from("contacts");
    console.log("Log - Load Contacts - DB Queried");
    //console.log(result);
    result.then(function (rows) {
      mainWindow.webContents.send("contacts:load", rows);
    });
  },

  // Populate the edit contact screen, if no id, skip and just open the window,
  loadEditContact: function (addWindow, id) {
    let result = knex.select("*").from("contacts").where("id", "=", id);
    console.log("Log - Contact Edit - DB Queried");
    //console.log(result);
    result.then(function (rows) {
      console.log(rows);
      addWindow.webContents.send("contact:loadEdit", rows);
    });
  },

  submitContactEdit: function (err, id, contactSubmit) {
    console.log("Log - Submit Edit Contact DB Query Begun");
    console.log("Log - Id and Name: ", id, contactSubmit.first_name);
    knex("contacts")
      .where({ id: id })
      .update(contactSubmit)
      .catch(err)
      .then(console.log("Log - data inserted"));
    return 0;
  },

  submitContactAdd: function (err, submitAdd) {
    console.log("Log - Submit Add Contact DB Query Begun");
    console.log("Log - Name: ", submitAdd.first_name);
    knex("contacts")
      .insert(submitAdd)
      .catch(err)
      .then(console.log("data inserted"));
    return 0;
  },

  deleteContact: function (err, id) {
    console.log("Log - Submit Delete Contact DB Query Begun");
    console.log("Log - ID Deleted: ", id);
    knex
      .from("contacts")
      .del()
      .where("id", "=", id)
      .then(() => console.log("log - data deleted successfully"))
      .catch((err) => {
        console.log(err);
        throw err;
      });
    return 0;
  },
};

module.exports = contacts;
