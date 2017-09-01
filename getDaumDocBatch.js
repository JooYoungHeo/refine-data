const request = require('request');
const path = require('path');
const cron = require('node-cron');
const mongoose = require('mongoose');

const cwd = process.cwd();
const config = require(path.join(cwd, 'config/config'));
const {requestOriginApi} = require(path.join(cwd, 'util'));

let Sports = require(path.join(cwd, 'models/sports'));

mongoose.Promise = global.Promise;  //mongoose use bluebird promise -> native es6 promise (change)
mongoose.connect('mongodb://localhost/test', {useMongoClient: true});

let apiKey = config.kakao.apiKey;
let query = '축구';
let size = 50;
let requestObject = {
  method: 'GET',
  url: 'https://dapi.kakao.com/v2/search/cafe',
  headers: {
    Authorization: `KakaoAK ${apiKey}`
  },
  qs: {
    query: query,
    sort: 'recency',
    size: size
  }
};

requestOriginApi(requestObject).then(result => {
  let jsonResult = JSON.parse(result);
  let docs = jsonResult.documents;

  for (let i = 0 ; i < docs.length ; i++) {
    let doc = docs[i];
    let item = new Sports();

    item.cafename = doc.cafename;
    item.contents = doc.contents;
    item.datetime = doc.datetime;
    item.thumbnail = doc.thumbnail;
    item.title = doc.title;
    item.url = doc.url;
    item.category = query;

    item.save(err => {
      if(err) console.error(err);
    });
  }

}).catch(err => {
  console.error(err);
});

// cron.schedule('0 */1 * * *', () => {
//
// }).start();
