const koa = require('koa');
const mount = require('koa-mount');
const login = require('./login');

const Koa = new koa();

Koa.use(mount('/login', login));

module.exports = Koa;
