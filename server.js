const Koa = require('koa');
const app = new Koa();
const mount = require('koa-mount');
const port = 3000;

let api = require('./routes');

app.use(mount('/api/v1', api));

app.listen(port, () => {
	console.log('server start #' + port);
});
