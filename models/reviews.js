const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  album: { type: String, required: true },
  title: { type: String },
  content: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now },
  reviewLink: { type: String, required: true }
});

module.exports = reviewSchema;
