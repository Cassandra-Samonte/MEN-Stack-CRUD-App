// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the pets collection
const albumSchema = new mongoose.Schema({
    artist: { type: String, required: true },
    album: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    whereToListen: { type: String },
    photo: { type: String, required: true },
    description: { type: String, required: true },
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Album', albumSchema);
