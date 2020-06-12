const fs = require("fs");
const ini = require("ini");
const path = require("path");

var load = {
  loadIni: function (fileName) {
    console.log("Log - ini filename = ", fileName);
    config = ini.parse(
      fs.readFileSync(path.join(__dirname, "../" + fileName), "utf-8")
    );
    console.log(config);
    return config;
  },
};

var write = {
  writeIni: function (fileName, newIni) {
    fs.writeFileSync(
      path.join(__dirname, "../" + fileName),
      ini.stringify(newIni, { section: "" })
    );
  },
};

module.exports = {
  load: load,
  write: write,
};
