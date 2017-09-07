const koa = require('koa');
const router = require('koa-router');
const mongoose = require('mongoose');
const path = require('path');
const _ = require('lodash');

const Koa = new koa();
const Router = new router();

let {Sports} = require(path.join(process.cwd(), 'models'));

Router.get('/', async (ctx, next) => {
  let skip = Number(ctx.query.page);
  let skipNumber = (_.isNaN(skip) || skip === 0)? 0: (skip - 1)*10;

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
  let limit = Number(ctx.query.limit);
  let limitNumber = (_.isNaN(limit) || limit === 0)? null: limit;

  await findSportsByGroup(limitNumber, 'cafename').then(result => {
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

Router.get('/categories', async (ctx, next) => {
  let limit = Number(ctx.query.limit);
  let limitNumber = (_.isNaN(limit) || limit === 0)? null: limit;

  await findSportsByGroup(limitNumber, 'category').then(result => {
    ctx.body = result;
  }).catch(err => {
    ctx.body = err;
  });
});

function findSportsByGroup(limit, groupName) {
  return new Promise((resolve, reject) => {
    let aggregateOption = [{
      $group: {
        _id: `$${groupName}`,
        count: {
          $sum: 1
        }
      }
    },{
      $sort: {
        count: -1
      }
    }];

    if(limit !== null) aggregateOption.push({$limit: limit});

    Sports.aggregate(aggregateOption).exec((err, item) => {
      err? reject(err): resolve(item);
    });
  });
}

Koa.use(Router.routes());

module.exports = Koa;
