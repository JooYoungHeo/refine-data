const Sports = require('./sports');
const mongoose = require('mongoose');

const mongooseUrl = 'localhost/test';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongooseUrl}`, {useMongoClient: true});

module.exports = {Sports};
