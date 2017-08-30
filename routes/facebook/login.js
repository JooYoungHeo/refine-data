const koa = require('koa');
const router = require('koa-router');
const path = require('path');

const cwd = process.cwd();
const util = require(path.join(cwd, 'util'));
const config = require(path.join(cwd, 'config/config'));

const Koa = new koa();
const Router = new router();

let appId = config.facebook.appId;
let appSecret = config.facebook.appSecret;
let redirectUri = config.facebook.redirectUri;

const requestCodeUrl = 'https://www.facebook.com/v2.10/dialog/oauth';
const requestTokenUrl = 'https://graph.facebook.com/v2.10/oauth/access_token';

Router.get('/login', async (ctx, next) => {
  let customCodeUrl = `${requestCodeUrl}?client_id=${appId}&redirect_uri=${redirectUri}`;
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
    method: 'GET',
    url: requestTokenUrl,
    qs: queryString
  };

  await util.requestOriginApi(requestObject).then(result => {
    util.writeJsonFile({facebook: result});
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

Koa.use(Router.routes());

module.exports = Koa;
