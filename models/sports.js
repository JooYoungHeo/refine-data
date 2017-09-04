const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let sportsSchema = new Schema({
  _id: String,
  cafename: String,
  contents: String,
  datetime: String,
  thumbnail: String,
  title: String,
  url: String,
  category: String
});

module.exports = mongoose.model('Sports', sportsSchema);
