const router = require('koa-router');
const koa = require('koa');

const Koa = new koa();
const Router = new router();

Router.get('/', async(ctx, next) => {
  ctx.body = 'ok';
});

Koa.use(Router.routes()).use(Router.allowedMethods());

module.exports = Koa;
