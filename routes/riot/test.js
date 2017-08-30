const router = require('koa-router');
const koa = require('koa');
const fs = require('fs');
const request = require('request');
const path = require('path');

const cwd = process.cwd();
const {requestOriginApi} = require(path.join(cwd, 'util'));
const config = require(path.join(cwd, 'config/config'));

const Koa = new koa();
const Router = new router();
const token = config.riot.key;

Router.get('/', async (ctx, next) => {
  let summonorName = config.riot.name;
  let requestObject = {
    method: 'GET',
    url: `https://kr.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonorName}`,
    headers: {
      'X-Riot-Token': token,
    }
  };

  await requestOriginApi(requestObject).then(result => {
    ctx.body = 'ok';
  }).catch(err => {
    ctx.body = err;
  });

});

Koa.use(Router.routes());

module.exports = Koa;
