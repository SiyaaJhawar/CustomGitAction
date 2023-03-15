
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
    });
  }
}
