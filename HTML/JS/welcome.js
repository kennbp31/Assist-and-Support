const fs = require("fs");
const ini = require("ini");
const path = require("path");
const { load, write } = require("../JS/iniConnect.js");

function loadIni() {
  let config = load.loadIni("config.ini");
  //load.loadIni("config.ini");
  if (config.Welcome.Display === false)
    document.getElementById("welcome").innerHTML = "";
}

function welcomeOff() {
  let config = load.loadIni("config.ini");
  console.log("Log-Ini:", config);
  config.Welcome.Display = false;

  write.writeIni("config.ini", config);
  loadIni();
}
