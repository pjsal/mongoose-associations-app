const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
}, { timestamps: true });

// These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.
module.exports = mongoose.model('Food', foodSchema);
