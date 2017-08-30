const koa = require('koa');
const router = require('koa-router');
const path = require('path');
const fs = require('fs');
const request = require('request');
const config = require(path.join(process.cwd(), 'config/config'));
const infoFile = path.join(process.cwd(), '../oauthInfo.json');
const facebookInfo = JSON.parse((JSON.parse(fs.readFileSync(infoFile))).facebook);

const Koa = new koa();
const Router = new router();

Router.get('/', async (ctx, next) => {

  let requestObject = {
    url: 'https://graph.facebook.com/me?fields=id,name,picture',
    headers: {
      Authorization: `Bearer ${facebookInfo.access_token}`
    }
  };

  await doRequest(requestObject).then(result => {
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

function doRequest(requestObject) {
  return new Promise((resolve, reject) => {
    request.get(requestObject, (err, httpResponse, body) => {
      err? reject(err): resolve(body);
    });
  });
}

Koa.use(Router.routes());

module.exports = Koa;
