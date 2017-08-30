const koa = require('Koa');
const mount = require('koa-mount');
const test = require('./test');

const Koa = new koa();

Koa.use(mount('/test', test));

module.exports = Koa;
