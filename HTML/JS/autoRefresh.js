//refresh the page after 900,000 miliseconds (15 minutes)
// This will update the weather and ensure that AHK is still running in the background.
window.setTimeout(function () {
  //reload the page
  location.reload();
  console.log("Log - Page Refreshed");
}, 900000);
