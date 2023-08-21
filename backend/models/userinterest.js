// models/UserInterest.js
const mongoose = require('mongoose');

const userInterestSchema = new mongoose.Schema({
  name: String,
  age: Number,
  education: String,
  interests: [String],
  location: {
    latitude: Number,
    longitude: Number,
  },
});

module.exports = mongoose.model('UserInterest', userInterestSchema);
