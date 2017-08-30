const router = require('koa-router');
const koa = require('koa');
const path = require('path');
const request = require('request');
const config = require(path.join(process.cwd(), 'config/config'));
const util = require(path.join(process.cwd(), 'util'));

const Koa = new koa();
const Router = new router();

const clientId = config.instagram.client_id;
const clientSecret = config.instagram.client_secret;
const redirectUrl = config.instagram.redirect_url;
const instaReqCodeUrl = 'https://api.instagram.com/oauth/authorize/?client_id=' + clientId +
												'&redirect_uri=' + redirectUrl +
												'&response_type=code&scope=public_content+likes+comments+follower_list+relationships';
const instaReqTokenUrl = 'https://api.instagram.com/oauth/access_token';

Router.get('/', async (ctx, next) => {
	ctx.redirect(instaReqCodeUrl);
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

	await getToken(requestForm).then(result => {
		util.writeJsonFile({instagram: result});
		ctx.body = result;
	}).catch(err => {
		ctx.body = err;
	});

});

function getToken(requestForm) {
	return new Promise((resolve, reject) => {
		request.post({url: instaReqTokenUrl, formData: requestForm}, (err, httpResponse, body) => {
			if(!err) {
				resolve(body);
			} else {
				reject(err);
			}
		});
	});
}

Koa.use(Router.routes());

module.exports = Koa;
