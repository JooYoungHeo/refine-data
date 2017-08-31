const koa = require('Koa');
const mount = require('koa-mount');

const Koa = new koa();

const insta = require('./insta');
const riot = require('./riot');
const facebook = require('./facebook');
const kakao = require('./kakao');

Koa.use(mount('/insta', insta));
Koa.use(mount('/riot', riot));
Koa.use(mount('/facebook', facebook));
Koa.use(mount('/kakao', kakao));

module.exports = Koa;
