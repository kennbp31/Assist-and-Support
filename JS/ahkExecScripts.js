const { exec } = require("child_process");
const path = require("path");
const { load } = require("./iniConnect.js");

var ahkExecScripts = {
  ahkFileLibrary: {
    phone: "Initiate_Phone_Call.exe",
    skype: "Initiate_Skype_Call.exe",
    main: "Main_Input.exe",
    input: "Key_Identifier.exe",
    exit: "Exit_App.exe",
  },

  ahkRunScript: function (callType) {
    let config = load.loadIni("config.ini");
    console.log(callType);
    if (config.Input.Disabled === true && callType === "main") {
      callType = "exit";
    }
    let pathname = path.join(
      __dirname,
      "../AutoHotKey/" + this.ahkFileLibrary[callType]
    );
    exec(pathname, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log("AHK File Executed: ", this.ahkFileLibrary[callType]);
    });
  },
};

module.exports = ahkExecScripts;
