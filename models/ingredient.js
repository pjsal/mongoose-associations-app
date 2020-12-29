const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    unique: true
  },
  origin: {
    type: String,
    default: '',
  },
}, { timestamps: true });
  
  // These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.
  module.exports = mongoose.model('Ingredient', ingredientSchema);
  