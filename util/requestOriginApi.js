const request = require('request');

function doRequest(requestObject) {
  return new Promise((resolve, reject) => {
    request(requestObject, (err, httpResponse, body) => {
      err? reject(err): resolve(body);
    })
  });
}

module.exports = doRequest;
