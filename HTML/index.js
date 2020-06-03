const electron = require("electron");
const { ipcRenderer } = electron;

ipcRenderer.on("weather:send", function (e, currWeather) {
  console.log(currWeather.weather[0].main);
  console.log("Log - Weather Data Received");
  let icon = document.getElementById("weatherIcon");
  icon.src =
    "http://openweathermap.org/img/wn/" +
    currWeather.weather[0].icon +
    "@2x.png";
  let city = document.querySelector(".card-subtitle");
  city.innerHTML = currWeather.name;
  let weatherDetails = document.querySelector(".card-text");
  weatherDetails.innerHTML =
    "<b>Temperature: </b>" +
    currWeather.main.temp +
    "°  <br> <b>Current Condition: </b>" +
    currWeather.weather[0].description;
});
