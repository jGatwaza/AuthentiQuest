const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  origin: String
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
