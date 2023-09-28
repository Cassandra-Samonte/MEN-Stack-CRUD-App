const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String },
  album: { type: String },
  title: { type: String },
  content: { type: String },
  reviewDate: { type: Date, default: Date.now },
  reviewLink: { type: String },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;