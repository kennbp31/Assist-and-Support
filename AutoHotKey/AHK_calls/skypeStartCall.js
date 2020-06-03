const { exec } = require("child_process");
const path = require("path");

var skypeStartCall = {
  pathname: path.join(__dirname, "../Cursor_Movement.exe"),
  file: "Cursor_Movement.exe",
  startCall: function () {
    exec(this.pathname, (error, stdout, stderr) => {
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

module.exports = skypeStartCall;
