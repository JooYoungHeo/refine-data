const route = require('koa-route');
const koa = require('koa');

const Koa = new koa();

Koa.use(route.get('/', async (ctx, next) => {
	ctx.body = {test: 'qwer', test2: 'zxcv', test3: 'ppppp'};
}));

module.exports = Koa;
