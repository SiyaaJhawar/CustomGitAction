var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.publicapis.org/entries", true);
xhr.send();

xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var result = JSON.parse(this.responseText);

    var entries = result.entries; // Get the entries array from the result object

    entries.forEach(function (entry) {
      var keys = Object.keys(entry); // Get the keys of the current entry object
    
      console.log("Key-Value Pairs:");
      keys.forEach(function (key) {
        console.log(`${key}: ${entry[key]}`);
      });

    
      if (entry.blocker) {
        console.log("Blocker found. Submitting PR for review...");

     
        var prRequest = new XMLHttpRequest();
        var url = "https://api.github.com/repos/SiyaaJhawar/demo/pulls";
        prRequest.open("POST", url, true);
        prRequest.setRequestHeader("Content-Type", "application/json");
        prRequest.setRequestHeader("Authorization", "Bearer {access_token}");

        var payload = {
          title: "Fix for blocker in API entry",
          body: "This pull request fixes the blocker found in the API entry.",
          head: "fix-blocker",
          base: "main"
        };

      
        prRequest.send(JSON.stringify(payload));

        // Handle the response from the API
        prRequest.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 201) {
            console.log("Pull request created successfully!");
          } else if (this.readyState === 4 && this.status !== 201) {
            console.log("Error creating pull request.");
          }
        }
      } else {
        console.log("No blocker found. Continuing workflow...");
       
      }
    });
  }
};

