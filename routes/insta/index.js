const koa = require('koa');
const mount = require('koa-mount');
const auth = require('./auth');

const Koa = new koa();

Koa.use(mount('/auth', auth));

module.exports = Koa;
