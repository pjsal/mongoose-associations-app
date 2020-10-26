const router = require('express').Router();
const User = require('../models/user').User;
const Tweet = require('../models/user').Tweet;

// INDEX USER
router.get('/', (req, res) => {
    // Find all users in the database 
    User.find({}, (error, allUsers) => {
        res.render('users/index.ejs', {
            users: allUsers
        })
    });
});

// NEW USER FORM
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

// ADD EMPTY FORM TO USER SHOW PAGE TO ADD TWEET TO A USER
router.get('/:userId', (req, res) => {
    // find user in db by id and add new tweet
    User.findById(req.params.userId, (error, user) => {
      res.render('users/show.ejs', { user });
    });
});

// CREATE A NEW USER
router.post('/', (req, res) => {
  User.create(req.body, (error, user) => {
    res.redirect(`/users/${user.id}`);
  });
});

// CREATE TWEET EMBEDDED IN USER
router.post('/:userId/tweets', (req, res) => {
    console.log(req.body);
    // store new tweet in memory with data from request body/ 'Tweet' is from the models const statement at the top
    const newTweet = new Tweet({ tweetText: req.body.tweetText });
  
    // find user in db by id and add new tweet.  Could have used a findByID and Updatye
    User.findById(req.params.userId, (error, user) => {
      // Push new tweet to copy in memory
      user.tweets.push(newTweet);
      //This will persist it in the DB
      user.save((err, user) => {
        res.redirect(`/users/${user.id}`);
      });
    });
  });

  // EDIT Tweet route
  router.get('/:userId/tweets/:tweetId/edit', (req, res) => {
    // set the value of the user and tweet ids
    const userId = req.params.userId;
    const tweetId = req.params.tweetId;
    // find user in db by id
    User.findById(userId, (err, foundUser) => {
      // find tweet embedded in user
      // Mongoose code that will find the tweet we want by the id.  No need to loop through array.
      const foundTweet = foundUser.tweets.id(tweetId);
      // update tweet text and completed with data from request body
      res.render('tweets/edit.ejs', { foundUser, foundTweet });
    });
  });
  
  // UPDATE TWEET EMBEDDED IN A USER DOCUMENT -  no page, just an action to update the tweet
  router.put('/:userId/tweets/:tweetId', (req, res) => {
    console.log('PUT ROUTE');
    // set the value of the user and tweet ids
    const userId = req.params.userId;
    const tweetId = req.params.tweetId;
  
    // find user in db by id.  This can be replaced with an update method.  Then no save would be needed either.
    User.findById(userId, (err, foundUser) => {
      // find tweet embedded in user
      // Mongoose code that will find the tweet we want by the id.  No need to loop through array.  Note that it will not be saved.  That's why the save statement below is needed.
      const foundTweet = foundUser.tweets.id(tweetId);
      // update tweet text and completed with data from request body
      foundTweet.tweetText = req.body.tweetText;
      foundUser.save((err, savedUser) => {
        res.redirect(`/users/${foundUser.id}`);
      });
    });
  });


  // DESTROY User - no page; just an action that will delete an entry 
  router.delete('/:userId', (req, res) => {
      User.findByIdAndRemove(req.params.userId, (error) => {
        res.redirect('/users');
      })
  });



  // DELETE Tweet Route - no page; just an action that will delete an entry
  router.delete('/:userId/tweets/:tweetId', (req, res) => {
    console.log('DELETE TWEET');
    // set the value of the user and tweet ids
    const userId = req.params.userId;
    const tweetId = req.params.tweetId;
  
    // find user in db by id.  This can be replaced with an update method.  Then no save would be needed either.
    User.findById(userId, (err, foundUser) => {
      // find tweet embedded in user
      // Mongoose delete method.  This doesn't permanently persist the change in the DB.
      foundUser.tweets.id(tweetId).remove();
      // update tweet text and completed with data from request body
      // This will save the changes in the database
      foundUser.save((err, savedUser) => {
        res.redirect(`/users/${foundUser.id}`);
      });
    });
  });
  


module.exports = router;