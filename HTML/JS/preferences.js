const electron = require("electron");
const { ipcRenderer } = electron;
const fs = require("fs");
const ini = require("ini");
const path = require("path");
const { load, write } = require("../JS/iniConnect.js");

var slider = document.getElementById("myRange");
var output = document.getElementById("inputDelay");
var exclusive = document.getElementById("exclusive");
var restart = document.getElementById("restart");

function loadIni() {
  let config = load.loadIni("config.ini");
  slider.value = config.Skype.Delay;
  output.value = slider.value;
  exclusive.checked = config.General.Exclusive;
  restart.checked = config.General.Restart;
  console.log("Log - Slider Value = " + slider.value);
}

function slideVal() {
  output.value = slider.value;
}

function dfSec() {
  output.value = 5;
  slider.value = 5;
}

// Update config file with new hotkeys, restart AHK scripts, close window
function writeIni() {
  let config = load.loadIni("config.ini");
  config.Skype.Delay = output.value;
  config.General.Exclusive = exclusive.checked;
  config.General.Restart = restart.checked;
  write.writeIni("config.ini", config);

  ipcRenderer.send("run:ahkScript", "main");
  //Close the form
  window.close();
}
