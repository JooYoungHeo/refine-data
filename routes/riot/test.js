const router = require('koa-router');
const koa = require('koa');
const fs = require('fs');
const request = require('request');
const path = require('path');
const config = require(path.join(process.cwd(), 'config/config'));

const Koa = new koa();
const Router = new router();
const token = config.riot.key;

Router.get('/', async (ctx, next) => {
  let summonorName = config.riot.name;

  await getRiotInfoByName(summonorName).then(result => {
    ctx.body = 'ok';
  }).catch(err => {
    ctx.body = err;
  });

});

function getRiotInfoByName(summonorName) {
  return new Promise((resolve, reject) => {
    let options = {
      url: 'https://kr.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonorName,
      headers: {
        'X-Riot-Token': token,
      }
    };

    request.get(options, (err, httpResponse, body) => {
      if(!err) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  });
}

Koa.use(Router.routes());

module.exports = Koa;
