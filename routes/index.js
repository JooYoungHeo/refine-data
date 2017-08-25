const route = require('koa-route');
const koa = require('Koa');
const mount = require('koa-mount');

const Koa = new koa();

const test = require('./test');

Koa.use(mount('/test', test));

module.exports = Koa;
