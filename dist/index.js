
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
    console.log("Key-Value Pairs:");
      keys.forEach(function (key) {
        console.log(`${key}: ${result[key]}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

getRequest();

  

  
