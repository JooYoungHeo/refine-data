const koa = require('koa');
const mount = require('koa-mount');
const search = require('./search');

const Koa = new koa();

Koa.use(mount('/search', search));

module.exports = Koa;
