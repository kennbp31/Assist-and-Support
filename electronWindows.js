const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu, ipcMain } = electron;
const weather = require("./APIs/weather.js");

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
        pathname: path.join(__dirname, "HTML/index.html"),
        protocol: "file",
        slashes: true,
      })
    );

    // TODO Populate list of items
    mainWindow.webContents.on("dom-ready", () => {
      mainWindow.zoomlevel = 0;
      console.log("Dom Ready!");
      weatherNode(mainWindow);
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

    return mainWindow;
  },
};

var newElectronWindow = {
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

    // TODO : Set this only when in development. This option removes menu bar from window
    //addWindow.setMenuBarVisibility(false);

    addWindow.setAlwaysOnTop(true, "screen");

    return addWindow;
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
        // TODO add route to contacts
        label: "Auto Skype Call",
        accelerator: process.platform == "darwin" ? "Command+S" : "Ctrl+S",
        click() {
          console.log("Log - Auto Skype Call List Window Loading");
          mainWindow.loadURL(
            url.format({
              pathname: path.join(__dirname, "HTML/call_list.html"),
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

module.exports = {
  newElectronWindow: newElectronWindow,
  createMainWindow: createMainWindow,
};

async function weatherNode(mainWindow) {
  let ip = await weather.ipAddress.ipAdd();
  let location = await weather.geoLocation.geoLocation(await ip);
  let currentWeather = await weather.currWeather.currWeather(
    await location,
    mainWindow
  );
}
