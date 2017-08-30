const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const file = path.join(process.cwd(), '../../oauthInfo.json');

function doWriteJson(additionalInfo) {

  if (_.isNil(additionalInfo)) return;

  let jsonInfo = {};

  if (fs.existsSync(file)) {
    try {
      jsonInfo = JSON.parse(fs.readFileSync(file));
    } catch(e) {
      jsonInfo = {};
    }
  }

  let keys = Object.keys(additionalInfo);
  let key = keys[0];
  jsonInfo[key] = additionalInfo[key];

  fs.writeFileSync(file, JSON.stringify(jsonInfo), 'utf8');

}

doWriteJson({riot: {token: 'ooooooo'}});
