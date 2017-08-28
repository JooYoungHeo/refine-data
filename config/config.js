let path = require('path');
let fs = require('fs');
let resourceFile = path.join(process.cwd(), '../resource.json');
let resource = JSON.parse(fs.readFileSync(resourceFile));

let config = resource;

module.exports = config;
