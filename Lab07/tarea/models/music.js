// Model music.js

const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  year: Number,
  audioFilePath: String,
  imageFilePath: String,
});

module.exports = mongoose.model('Music', musicSchema);
