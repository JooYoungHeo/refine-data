const koa = require('Koa');
const mount = require('koa-mount');

const Koa = new koa();

const callTest = require('./callTest');

Koa.use(mount('/callTest', callTest));

module.exports = Koa;
