const koa = require('Koa');
const mount = require('koa-mount');

const Koa = new koa();

const authToInsta = require('./authToInsta');
const insta = require('./insta');
const riot = require('./riot');
const routerTest = require('./routerTest');
const facebook = require('./facebook');

// Koa.use(mount('/insta/auth', authToInsta));
Koa.use(mount('/insta', insta));
Koa.use(mount('/riot', riot));
Koa.use(mount('/test', routerTest));
Koa.use(mount('/facebook', facebook));

module.exports = Koa;
