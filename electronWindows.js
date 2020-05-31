const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu, ipcMain } = electron;

var electronWindows = {
  // Opens a new window - popup win
  createAddWindow: function () {
    console.log("Log - Wondow Opening");
    addWindow = new BrowserWindow({
      width: 500,
      height: 800,
      title: "Add Shopping List Item",
      webPreferences: {
        nodeIntegration: true,
      },
    });

    // Load HTML into window
    addWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "HTML/contactedit.html"),
        protocol: "file",
        slashes: true,
      })
    );

    // Remove menu bar from window
    //addWindow.setMenuBarVisibility(false);

    addWindow.setAlwaysOnTop(true, "screen");

    return addWindow;
  },
};

module.exports = electronWindows;
