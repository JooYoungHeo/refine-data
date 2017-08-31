const koa = require('koa');
const router = require('koa-router');
const path = require('path');

const cwd = process.cwd();
const {requestOriginApi} = require(path.join(cwd, 'util'));
const config = require(path.join(cwd, 'config/config'));

const Koa = new koa();
const Router = new router();

Router.get('/', async (ctx, next) => {
  let apiKey = config.kakao.apiKey;
  let query = ctx.query.query;
  let queryString = {
    query: query
  };
  let requestObject = {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${apiKey}`
    },
    url: 'https://dapi.kakao.com/v2/search/cafe',
    qs: queryString
  };

  await requestOriginApi(requestObject).then(result => {
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

Koa.use(Router.routes());

module.exports = Koa;
