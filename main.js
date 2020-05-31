const electron = require("electron");
const url = require("url");
const path = require("path");
const contacts = require("./contacts.js");
const electronWindows = require("./electronWindows.js");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

let knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./main.db",
  },
  useNullAsDefault: true,
});

app.on("ready", function () {
  // Create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      fullscreen: true,
    },
  });

  // Load the app in fullscreen mode (Enable setFullscreen later to ensure app is the PC UI....ish)
  // mainWindow.setFullScreen(true);
  mainWindow.maximize();

  // Load HTML into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "HTML/index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  // TODO Populate list of items
  mainWindow.webContents.on("dom-ready", () => {
    console.log("Dom Ready!");
  });

  // Quit app on close
  mainWindow.on("closed", function () {
    app.quit();
  });

  // Build Menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert menu
  Menu.setApplicationMenu(mainMenu);
  console.log("Window Not-Loaded");
});

// Catch contact edit request
ipcMain.on("contact:edit", function (err, id) {
  console.log("Log - Edit call received");

  if (addWindow === undefined) {
    if (id) {
      addWindow = electronWindows.createAddWindow();
      addWindow.webContents.on("did-finish-load", () => {
        contacts.loadEditContact(addWindow, id);
      });
      // Garbage colletion handle
      addWindow.on("close", function () {
        addWindow = undefined;
      });

      // If there is no id, then it is a new contact, just open a blank contact window.
    } else {
      addWindow = electronWindows.createAddWindow();

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
  const delContact = async () => {
    let promise = await contacts.deleteContact(err, id);
    addWindow.close();
    contacts.loadContacts(mainWindow);
  };

  delContact();
});

// Create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        // TODO add route back to home screen
        label: "Home",
        accelerator: process.platform == "darwin" ? "Command+H" : "Ctrl+H",
        click() {
          console.log("Home Clicked");
          mainWindow.loadURL(
            url.format({
              pathname: path.join(__dirname, "HTML/index.html"),
              protocol: "file",
              slashes: true,
            })
          );
        },
      },

      {
        // TODO add route to contacts
        label: "Contacts",
        accelerator: process.platform == "darwin" ? "Command+W" : "Ctrl+W",
        click() {
          console.log("Contacts Clicked");
          mainWindow.loadURL(
            url.format({
              pathname: path.join(__dirname, "HTML/contact.html"),
              protocol: "file",
              slashes: true,
            })
          );
        },
      },

      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

// If mac, add empty object to menu
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
