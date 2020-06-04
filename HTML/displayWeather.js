// IMPORTANT: CONST ELECTRON IS NOT IN THIS FILE, THERE WAS AN ISSUE RECEIVING MESSAGES FROM 2 SOURCES AT ONCE.
// IF USING ELSEWHERE IN THIS APP, MODIFICATIONS MAY BE NEEDED TO RECIEVE THE CALL FROM MAIN TO RUN.

ipcRenderer.on("weather:send", function (e, currWeather) {
  console.log("Log - Weather Data Received");
  // collect icon from open weathers api
  let icon = document.getElementById("weatherIcon");
  icon.src =
    "http://openweathermap.org/img/wn/" +
    currWeather.weather[0].icon +
    "@2x.png";

  // add city, and weather info to div
  let city = document.querySelector("#city");
  city.innerHTML = currWeather.name;
  let weatherDetails = document.querySelector("#weatherConditions");
  weatherDetails.innerHTML =
    "<b>Temperature: </b>" +
    currWeather.main.temp +
    "°  <br> <b>Current Condition: </b>" +
    currWeather.weather[0].description;
});
