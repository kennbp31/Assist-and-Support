const { exec } = require("child_process");
const path = require("path");

var ahkExecScripts = {
  ahkFileLibrary: {
    phone: "Initiate_Phone_Call.exe",
    skype: "Initiate_Skype_Call.exe",
    main: "Main_Input.exe",
    input: "Key_Identifier.exe",
    exit: "Exit_App.exe",
  },

  ahkRunScript: function (callType) {
    console.log(callType);
    let pathname = path.join(__dirname, "../" + this.ahkFileLibrary[callType]);
    exec(pathname, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  },
};

module.exports = ahkExecScripts;
