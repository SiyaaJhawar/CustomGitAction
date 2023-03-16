
const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: "$secrets.GITHUB_TOKEN",
});


octokit.rest.activity
  .random()
  .then((response) => {
    const result = response.data;

    const activityType = result.type; 

    console.log(`Activity Type: ${activityType}`);

    // Check if the activity is a blocker
    if (activityType != "recreational") {
      console.log("Blocker found. Submitting PR for review...");

     
      const payload = {
        owner: "SiyaaJhawar",
        repo: "CustomGitAction",
        title: "Fix for blocker in Bored API",
        body: "This pull request fixes the blocker found in the Bored API.",
        head: "SiyaaJhawar-patch-1",
        base: "main",
      };

      // Send the pull request payload
      octokit.rest.pulls
        .create(payload)
        .then((response) => {
          console.log("Pull request created successfully!");
        })
        .catch((error) => {
          console.log("Error creating pull request.", error);
        });
    } else {
      const keys = Object.keys(result); // Get the keys of the result object

      console.log("Key-Value Pairs:");
      keys.forEach(function (key) {
        console.log(`${key}: ${result[key]}`);
      });
    }
  })
  .catch((error) => {
    console.log("Error getting random activity.", error);
  });


  

  
