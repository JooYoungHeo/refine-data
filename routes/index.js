const koa = require('Koa');
const mount = require('koa-mount');

const Koa = new koa();

const authToInsta = require('./authToInsta');
const riot = require('./riot');
const routerTest = require('./routerTest');

Koa.use(mount('/insta/auth', authToInsta));
Koa.use(mount('/riot', riot));
Koa.use(mount('/test', routerTest));

module.exports = Koa;
