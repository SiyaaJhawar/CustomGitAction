const fetch = require('node-fetch');
fetch('https://example.com/api/data')
  .then(response => response.json())
  .then(data => {
    // The data variable contains the parsed JSON response from the API.
    // Iterate over the keys and values and log them to the console.
    Object.keys(data).forEach(key => {
      console.log(key + ': ' + data[key]);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

