const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  album: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now },
  reviewLink: { type: String, required: true },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;


