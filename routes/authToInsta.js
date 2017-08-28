const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const request = require('request');
const config = require(path.join(process.cwd(), 'config/config'));

const Koa = new koa();

const instaReqCodeUrl = 'https://api.instagram.com/oauth/authorize/?client_id=' + config.client_id +
												'&redirect_uri=' + config.redirect_url + '&response_type=code';
const instaReqTokenUrl = 'https://api.instagram.com/oauth/access_token';

Koa.use(route.get('/', async (ctx, next) => {
	ctx.redirect(instaReqCodeUrl);
}));

Koa.use(route.get('/callback', async (ctx, next) => {
	let code = ctx.query.code;
	let requestForm = {
		client_id: config.client_id,
		client_secret: config.client_secret,
		grant_type: 'authorization_code',
		redirect_uri: config.redirect_url,
		code: code
	};

	await getToken(requestForm).then(result => {
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
