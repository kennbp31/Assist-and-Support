//refresh the page after 900,000 miliseconds (15 minutes)
// This will update the weather and ensure that AHK is still running in the background.
window.setTimeout(function () {
  //reload the page
  location.reload();
  console.log("Log - Page Refreshed");
}, 900000);

// Ensure that the user has internet.
function internetStatus() {
  if (navigator.onLine === false) {
    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    body.style;
    body.innerHTML =
      "<p style=' text-align: center;color: white;position:absolute; top:40%; left:20vw; right:20vw;'><b>Assist and Support Requires an Internet Connect.</b> <br> <br>If you internet is working please ensure that anti-virus and firewall applications are not blocking this application.<br><br> The application will attempt to reconnect automatically every 15 minutes.</p>";
  }
}
