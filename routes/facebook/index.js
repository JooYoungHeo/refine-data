const koa = require('koa');
const mount = require('koa-mount');
const login = require('./login');
const me = require('./myInfo');

const Koa = new koa();

Koa.use(mount('/', login));
Koa.use(mount('/me', me));

module.exports = Koa;
