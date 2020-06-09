const fs = require("fs");
const ini = require("ini");
const path = require("path");

function loadIni() {
  var config = ini.parse(
    fs.readFileSync(
      path.join(__dirname, "../AutoHotKey/Input_Mapping.ini"),
      "utf-8"
    )
  );
  if (config.Welcome.Display === false)
    document.getElementById("welcome").innerHTML = "";
}

function welcomeOff() {
  var config = ini.parse(
    fs.readFileSync(
      path.join(__dirname, "../AutoHotKey/Input_Mapping.ini"),
      "utf-8"
    )
  );
  console.log("Log-Ini:", config);
  config.Welcome.Display = false;

  fs.writeFileSync(
    path.join(__dirname, "../AutoHotKey/Input_Mapping.ini"),
    ini.stringify(config, { section: "" })
  );
  loadIni();
}
