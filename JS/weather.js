const request = require("request");
const geoip = require("geoip-lite");
const publicIp = require("public-ip");

// lookup users IPv6 Address, using in weather node to identify location
var ipAddress = {
  ipAdd: async function () {
    return await publicIp.v6();
  },
};

// Lookup users location uding IPv6
var geoLocation = {
  geoLocation: async function (ip) {
    return await geoip.lookup(ip);
  },
};

// use open weather api to get current conditions, then pass to the rendered page.
var currWeather = {
  currWeather: async function (geoLocation, mainWindow) {
    //TODO: Place this key in an ENV variable.
    let apiKey = "6e95d5bec883ec1a80131ed56f8c9a94";
    let lat = geoLocation.ll[0];
    let lon = geoLocation.ll[1];
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    let weather = request(url, async function (err, response, body) {
      if (err) {
        console.log("error:", error);
      } else {
        var currWeather = await JSON.parse(body);
      }
      // TODO unable to return values(confusion...), rewrite and send to main prior to passing to html/js
      mainWindow.webContents.send("weather:send", currWeather);
    });
  },
};

module.exports = {
  ipAddress: ipAddress,
  geoLocation: geoLocation,
  currWeather: currWeather,
};
