const { Octokit } = require("octokit");
// import { createPullRequest } from "octokit-plugin-create-pull-request";
const { createPullRequest } = require("octokit-plugin-create-pull-request");
//const Octokit = Octokit.plugin(createPullRequest);
const TOKEN ="1234"
const octokit = new Octokit({
  auth: TOKEN,
});

(async () => {
  try {
    

    const result = await octokit.request('GET /activity', {
      baseUrl: 'https://www.boredapi.com/api',
    });

    const activityType = result.data.type;

    console.log(`Activity Type: ${activityType}`);

    if (activityType !== "recreational") {
      console.log("Blocker found. Submitting PR for review...");

    
      const prResponse = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
        owner: 'SiyaaJhawar',
        repo: 'CustomGitAction',
         title: "Fix for blocker in Bored API",
        body: "This pull request fixes the blocker found in the Bored API.",
        head: "SiyaaJhawar-patch-1",
        base: "main"
      });
      


      console.log("Pull request created successfully!");
    } else {
      console.log("Key-Value Pairs:");
      for (const [key, value] of Object.entries(result.data)) {
        console.log(`${key}: ${value}`);
      }
    }
  } catch (error) {
    console.error("Error occurred: ", error.message);
  }
})();

