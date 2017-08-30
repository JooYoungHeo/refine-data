const koa = require('koa');
const router = require('koa-router');
const path = require('path');
const config = require(path.join(process.cwd(), 'config/config'));

const Koa = new koa();
const Router = new router();

Router.get('/', async (ctx, next) => {
  ctx.body = config;
});

Koa.use(Router.routes());

module.exports = Koa;
