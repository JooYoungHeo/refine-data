const koa = require('koa');
const router = require('koa-router');
const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
const {requestOriginApi} = require(path.join(cwd, 'util'));
const infoFile = path.join(cwd, '../oauthInfo.json');
const facebookInfo = JSON.parse((JSON.parse(fs.readFileSync(infoFile))).facebook);

const Koa = new koa();
const Router = new router();

Router.get('/', async (ctx, next) => {

  let requestObject = {
    method: 'GET',
    url: 'https://graph.facebook.com/me?fields=id,name,picture',
    headers: {
      Authorization: `Bearer ${facebookInfo.access_token}`
    }
  };

  await requestOriginApi(requestObject).then(result => {
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

Koa.use(Router.routes());

module.exports = Koa;
