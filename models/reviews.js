const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now }
});

module.exports = reviewSchema;
