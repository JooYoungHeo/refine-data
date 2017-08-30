const Koa = require('koa');
const app = new Koa();
const mount = require('koa-mount');
const port = 3000;

let api = require('./routes');

app.use(mount('/api', api));

app.listen(port, () => {
	console.log('server start #' + port);
});
