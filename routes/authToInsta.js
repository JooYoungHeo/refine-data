const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const request = require('request');
const config = require(path.join(process.cwd(), 'config/config'));

const Koa = new koa();

const instaAuthUrl = 'https://api.instagram.com/oauth/authorize/?client_id=' + config.client_id +
												'&redirect_uri=' + config.redirect_url + '&response_type=code';

Koa.use(route.get('/', async (ctx, next) => {
	ctx.redirect(instaAuthUrl);
}));

Koa.use(route.get('/callback', async(ctx, next) => {
	ctx.body = 'hi';
}));

module.exports = Koa;
