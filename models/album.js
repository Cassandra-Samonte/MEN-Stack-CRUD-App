// Require the Mongoose package
const mongoose = require('mongoose');
const reviewSchema = require('./reviews.js')

// Create a schema to define the properties of the albums collection
const albumSchema = new mongoose.Schema({
    artist: { type: String, required: true },
    album: { type: String, required: true },
    releaseDate: {
        type: Date,
        default: Date.now,
        get: (date) => {
            const dateFormat = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return date.toLocaleDateString("en-US", dateFormat);
        }
    },
    whereToListen: { type: String },
    photo: { type: String },
    description: { type: String },
    reviews: [reviewSchema]
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Album', albumSchema);
