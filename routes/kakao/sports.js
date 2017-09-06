const koa = require('koa');
const router = require('koa-router');
const mongoose = require('mongoose');
const path = require('path');
const _ = require('lodash');

const Koa = new koa();
const Router = new router();

let {Sports} = require(path.join(process.cwd(), 'models'));

Router.get('/', async (ctx, next) => {
  let skip = ctx.query.page;
  let convertSkip = Number(skip);

  if (_.isNil(skip) || typeof convertSkip !== 'number' || convertSkip === 0) {
    skip = 1;
  }

  let skipNumber = (skip - 1) * 10;

  await findSports(skipNumber).then(result => {
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

function findSports(skip) {
  return new Promise((resolve, reject) => {
    Sports.find().skip(skip).limit(10).exec((err, item) => {
      err? reject(err): resolve(item);
    });
  });
}

Router.get('/cafes', async (ctx, next) => {
  await findCafes().then(result => {
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

function findCafes() {
  return new Promise((resolve, reject) => {
    Sports.aggregate([{
      $group: {
        _id: "$cafename",
        count: {
          $sum: 1
        }
      }
    },{
      $sort: {
        count: -1
      }
    }]).exec((err, item) => {
      err? reject(err): resolve(item);
    });
  });
}

Koa.use(Router.routes());

module.exports = Koa;
