const router = require('koa-router');
const koa = require('koa');
const path = require('path');

const cwd = process.cwd();
const config = require(path.join(cwd, 'config/config'));
const util = require(path.join(cwd, 'util'));

const Koa = new koa();
const Router = new router();

const clientId = config.instagram.client_id;
const clientSecret = config.instagram.client_secret;
const redirectUrl = config.instagram.redirect_url;
const instaReqCodeUrl = 'https://api.instagram.com/oauth/authorize/';
const instaReqTokenUrl = 'https://api.instagram.com/oauth/access_token';

Router.get('/', async (ctx, next) => {
	let customCodeUrl = `${instaReqCodeUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}` +
												`&response_type=code&scope=public_content+likes+comments+follower_list+relationships`;
	ctx.redirect(customCodeUrl);
});

Router.get('/callback', async (ctx, next) => {
	let code = ctx.query.code;
	let requestForm = {
		client_id: clientId,
		client_secret: clientSecret,
		grant_type: 'authorization_code',
		redirect_uri: redirectUrl,
		code: code
	};
	let requestObject = {
		method: 'POST',
		url: instaReqTokenUrl,
		formData: requestForm
	};

	await util.requestOriginApi(requestObject).then(result => {
		util.writeJsonFile({instagram: result});
		ctx.body = result;
	}).catch(err => {
		ctx.body = err;
	});

});

Koa.use(Router.routes());

module.exports = Koa;
