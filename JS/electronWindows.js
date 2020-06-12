const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu, ipcMain } = electron;
const fs = require("fs");
const ini = require("ini");
const ahkExecScripts = require("./ahkExecScripts.js");
const { load, write } = require("../JS/iniConnect.js");

let addWindow;

var createMainWindow = {
  // Create new window
  createMainWindow: function () {
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
        pathname: path.join(__dirname, "../HTML/index.html"),
        protocol: "file",
        slashes: true,
      })
    );

    // TODO Populate list of items
    mainWindow.webContents.on("dom-ready", () => {
      mainWindow.zoomlevel = 0;
      console.log("Dom Ready!");
    });

    // Quit app on close
    mainWindow.on("closed", () => {
      closeAHK(app.quit());
    });

    // callback function to ensure ahk is killed prior to app closing.
    function closeAHK(callback) {
      ahkExecScripts.ahkRunScript("exit");
      callback;
    }

    // Build Menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(mainMenu);
    console.log("Window Not-Loaded");

    return mainWindow;
  },
};

var newElectronWindow = {
  // Opens a new window - popup win
  createAddWindow: function (winTitle, urlPage) {
    if (addWindow === undefined) {
      console.log("Log - Wondow Opening");
      addWindow = new BrowserWindow({
        width: 500,
        height: 800,
        title: winTitle,
        webPreferences: {
          nodeIntegration: true,
        },
      });
      //

      // Load HTML into window
      addWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, urlPage),
          protocol: "file",
          slashes: true,
        })
      );
      addWindow.setAlwaysOnTop(true, "screen");
      addWindow.on("close", function () {
        addWindow = undefined;
      });

      return addWindow;
    }
  },
};

// Create menu template, this has to be in the same JS as the window creation,
// they rely on communication back and forth. Im sure they can be connected together via outside JS modules
// but the reward of decoupling the code is not worth the time investment at this point.
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        // route back to home screen
        label: "Home",
        accelerator: process.platform == "darwin" ? "Command+H" : "Ctrl+H",
        click() {
          console.log("Home Clicked");
          mainWindow.loadURL(
            url.format({
              pathname: path.join(__dirname, "../HTML/index.html"),
              protocol: "file",
              slashes: true,
            })
          );
        },
      },

      {
        // route to Auto Caller Screen
        label: "Auto Skype Call",
        accelerator: process.platform == "darwin" ? "Command+S" : "Ctrl+S",
        click() {
          console.log("Log - Auto Skype Call List Window Loading");
          mainWindow.loadURL(
            url.format({
              pathname: path.join(__dirname, "../HTML/call_list.html"),
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

  // Menu for configurations and preferences. (Input setup, home screen design, etc...)
  {
    label: "Options",
    submenu: [
      {
        // route to contacts
        label: "Add/Edit Contacts",
        accelerator: process.platform == "darwin" ? "Command+E" : "Ctrl+E",
        click() {
          console.log("Contacts Clicked");
          mainWindow.loadURL(
            url.format({
              pathname: path.join(__dirname, "../HTML/contact.html"),
              protocol: "file",
              slashes: true,
            })
          );
        },
      },

      {
        label: "Preferences",
        accelerator: process.platform == "darwin" ? "Command+P" : "Ctrl+P",
        click() {
          // Ensure preferences is not opened yet
          console.log("Log - Preferences Clicked");
          newElectronWindow.createAddWindow(
            "Preferences",
            "../HTML/preferences.html"
          );
        },
      },
      {
        label: "Reset Welcome Text",
        accelerator: process.platform == "darwin" ? "Command+W" : "Ctrl+W",
        click() {
          // Ensure preferences is not opened yet
          console.log("Log - Reset Welcome Clicked");
          (() => {
            let config = load.loadIni("config.ini");
            console.log("Log-Ini:", config);
            config.Welcome.Display = true;

            write.writeIni("config.ini", config);
          })();
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

module.exports = {
  newElectronWindow: newElectronWindow,
  createMainWindow: createMainWindow,
};
