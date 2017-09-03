const koa = require('koa');
const router = require('koa-router');
const mongoose = require('mongoose');
const path = require('path');

const Koa = new koa();
const Router = new router();

let {Sports} = require(path.join(process.cwd(), 'models'));

Router.get('/', async (ctx, next) => {
  await findSports().then(result => {
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

function findSports() {
  return new Promise((resolve, reject) => {
    Sports.find((err, item) => {
      err? reject(err): resolve(item);
    });
  });
}

Koa.use(Router.routes());

module.exports = Koa;
