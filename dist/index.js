const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

(async () => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner: 'SiyaaJhawar',
    repo: 'CustomGitAction'
  });

  const result = await octokit.request('GET /activity', {
    baseUrl: 'https://www.boredapi.com/api',
  });

  const activityType = result.data.type;

  console.log(`Activity Type: ${activityType}`);

  if (activityType != "recreational") {
    console.log("Blocker found. Submitting PR for review...");

    const payload = {
      title: "Fix for blocker in Bored API",
      body: "This pull request fixes the blocker found in the Bored API.",
      head: "SiyaaJhawar-patch-1",
      base: "main"
    };

    const prResponse = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
      owner: 'SiyaaJhawar',
      repo: 'CustomGitAction',
      ...payload
    });

    console.log("Pull request created successfully!");
  } else {
    console.log("Key-Value Pairs:");
    for (const [key, value] of Object.entries(result.data)) {
      console.log(`${key}: ${value}`);
    }
  }
})();
