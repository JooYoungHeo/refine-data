const koa = require('koa');
const router = require('koa-router');
const path = require('path');
const request = require('request');
const writeJsonFile = require(path.join(process.cwd(), 'util/writeJsonFile'));
const config = require(path.join(process.cwd(), 'config/config'));

const Koa = new koa();
const Router = new router();

let appId = config.facebook.appId;
let appSecret = config.facebook.appSecret;
let redirectUri = config.facebook.redirectUri;

const requestCodeUrl = 'https://www.facebook.com/v2.10/dialog/oauth';
const requestTokenUrl = 'https://graph.facebook.com/v2.10/oauth/access_token';

Router.get('/login', async (ctx, next) => {

  let customCodeUrl = requestCodeUrl + '?client_id=' + appId + '&redirect_uri=' + redirectUri;

  ctx.redirect(customCodeUrl);

});

Router.get('/callback', async (ctx, next) => {

  let code = ctx.query.code;
  let queryString = {
    client_id: appId,
    redirect_uri: redirectUri,
    client_secret: appSecret,
    code: code
  };
  let requestObject = {
    url: requestTokenUrl,
    qs: queryString
  };

  await doRequest(requestObject).then(result => {
    writeJsonFile({facebook: result});
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
