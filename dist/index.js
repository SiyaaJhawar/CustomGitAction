<<<<<<< HEAD
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: "YOUR_PERSONAL_ACCESS_TOKEN",
});

const getRequest = async () => {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: "SiyaaJhawar",
      repo: "CustomGitAction",
      path: "activity.json",
    });
    const result = JSON.parse(response.data.content);
    const activityType = result.type;

    console.log(`Activity Type: ${activityType}`);

    if (activityType !== "recreational") {
      console.log("Blocker found. Submitting PR for review...");

      const pullRequest = await octokit.pulls.create({
        owner: "SiyaaJhawar",
        repo: "CustomGitAction",
        title: "Fix for blocker in Bored API",
        body: "This pull request fixes the blocker found in the Bored API.",
        head: "SiyaaJhawar-patch-1",
        base: "main",
      });

      console.log("Pull request created successfully!");
    } else {
      const keys = Object.keys(result);
=======
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
      prRequest.open("GET", url, true);
      prRequest.setRequestHeader("Content-Type", "application/json");
      prRequest.setRequestHeader("Authorization", "Bearer $secrets.GITHUB_TOKEN");
     // console.log("secrets.GITHUB_TOKEN");

      // Create the pull request payload
      var payload = {
        title: "Fix for blocker in Bored API",
        body: "This pull request fixes the blocker found in the Bored API.",
        head: "SiyaaJhawar-patch-1",
        base: "main"
      };

     
      prRequest.send(JSON.stringify(payload));

    
      prRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 201) {
          console.log("Pull request created successfully!");
        } else if (this.readyState === 4 && this.status !== 201) {
          console.log("Error creating pull request.");
          console.log("Response: " + this.responseText);
        }
      }
    } else {
      var keys = Object.keys(result); // Get the keys of the result object
>>>>>>> 8a0f74a157b5b93fa3f8e3561eb5195113f96683
      
      console.log("Key-Value Pairs:");
      keys.forEach(function (key) {
        console.log(`${key}: ${result[key]}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

<<<<<<< HEAD
getRequest();

  

  
=======


>>>>>>> 8a0f74a157b5b93fa3f8e3561eb5195113f96683
