const route = require('koa-route');
const koa = require('Koa');
const mount = require('koa-mount');

const Koa = new koa();

const authToInsta = require('./authToInsta');

Koa.use(mount('/auth', authToInsta));

module.exports = Koa;
