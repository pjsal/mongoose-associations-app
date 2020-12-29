const mongoose = require('mongoose');
const songSchema = new mongoose.Schema(
  {
    songName: String,
  },
  { timestamps: true }
);
const albumSchema = new mongoose.Schema(
  {
    name: String,
    // embed songs in album
    songs: [songSchema],
  },
  { timestamps: true }
);

// These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.
const Album = mongoose.model('Album', albumSchema);
const Song = mongoose.model('Song', songSchema);

module.exports = { Album, Song };