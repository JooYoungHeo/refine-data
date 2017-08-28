const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const fs = require('fs');
const request = require('request');
const config = require(path.join(process.cwd(), 'config/config'));
const oauthInfoFile = path.join(process.cwd(), '../oauthInfo.json');

const Koa = new koa();

const clientId = config.client_id;
const clientSecret = config.client_secret;
const redirectUrl = config.redirect_url;
const instaReqCodeUrl = 'https://api.instagram.com/oauth/authorize/?client_id=' + clientId +
												'&redirect_uri=' + redirectUrl + '&response_type=code';
const instaReqTokenUrl = 'https://api.instagram.com/oauth/access_token';

Koa.use(route.get('/', async (ctx, next) => {
	ctx.redirect(instaReqCodeUrl);
}));

Koa.use(route.get('/callback', async (ctx, next) => {
	let code = ctx.query.code;
	let requestForm = {
		client_id: clientId,
		client_secret: clientSecret,
		grant_type: 'authorization_code',
		redirect_uri: redirectUrl,
		code: code
	};

	await getToken(requestForm).then(result => {
		fs.writeFileSync(oauthInfoFile, result, 'utf8');
		ctx.body = result;
	}).catch(err => {
		ctx.body = err;
	});

}));

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

module.exports = Koa;
