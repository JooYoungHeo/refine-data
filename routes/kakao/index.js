const koa = require('koa');
const mount = require('koa-mount');
const search = require('./search');
const sports = require('./sports');

const Koa = new koa();

Koa.use(mount('/search', search));
Koa.use(mount('/sports', sports));

module.exports = Koa;
