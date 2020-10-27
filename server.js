const express = require('express');
const app = express();
const mongoose = require('mongoose');
// Needed for method overrides
const methodOverride = require('method-override');
// Needed for EJS Layouts
const expressLayouts = require('express-ejs-layouts');
const PORT = 3000;

const mongoURI = 'mongodb://localhost:27017/mongoRelationships';

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);

app.set('view engine', 'ejs');
app.use(expressLayouts);
// Body Parser
app.use(express.urlencoded({ extended: false }));
// Path for CSS, images, or any other items 
app.use(express.static('public'));
// Tells express to override the method using query string
app.use(methodOverride('_method'));
// Define path for users/tweets routes and link to control file
app.use('/users', require('./controllers/usersController'));
// Define path for album/songs routes and link to control file
app.use('/albums', require('./controllers/albumsController'));
// Define path for ingredients route and link to control file
app.use('/ingredients', require('./controllers/ingredientsController'));
// Define path for foods route and link to control file
app.use('/foods', require('./controllers/foodsController'));

// This is not in the controller files because it is considered a separate page - home page
app.get('/', (req, res) => {
  res.render('home.ejs');
});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});