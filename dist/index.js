var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.boredapi.com/api/activity", true);
xhr.send();

xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var result = JSON.parse(this.responseText);

    var activityType = result.type; // Get the activity type from the result object

    console.log(`Activity Type: ${activityType}`);

    // Check if the activity is a blocker
    if (activityType != "recreational") {
      console.log("Blocker found. Submitting PR for review...");

      // Set up the request to create a new pull request
      var prRequest = new XMLHttpRequest();
var url = "https://api.github.com/repos/SiyaaJhawar/CustomGitAction/pulls";
prRequest.open("POST", url, true);
prRequest.setRequestHeader("Content-Type", "application/json");
prRequest.setRequestHeader("Authorization", "Bearer {access_token}");

// Create the pull request payload
var payload = {
  title: "Fix for blocker in Bored API",
  body: "This pull request fixes the blocker found in the Bored API.",
  head: "SiyaaJhawar-patch-1",
  base: "main"
};

// Send the pull request payload
prRequest.send(JSON.stringify(payload));

// Handle the response from the API
prRequest.onreadystatechange = function() {
  console.log(`Ready state: ${this.readyState}, Status: ${this.status}`);
  if (this.readyState === 4 && this.status === 201) {
    console.log("Pull request created successfully!");
  } else if (this.readyState === 4 && this.status !== 201) {
    console.log("Error creating pull request.");
    console.log(this.responseText);
  }
}

