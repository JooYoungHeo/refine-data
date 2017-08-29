const route = require('koa-route');
const koa = require('Koa');
const mount = require('koa-mount');

const Koa = new koa();

const authToInsta = require('./authToInsta');
const riot = require('./riot');

Koa.use(mount('/insta/auth', authToInsta));
Koa.use(mount('/riot', riot));

module.exports = Koa;
