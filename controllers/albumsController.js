const router = require('express').Router();
const Album = require('../models/album').Album;
const Song = require('../models/user').Song;

// ROUTES
// INDEX for Albums - main menu
router.get('/', (req, res) => {
    // Find all albums in the database 
    // User.find({}, (error, allUsers) => {
    //     res.render('users/index.ejs', {
    //         users: allUsers
    //     })
    // });
    res.render('albums/index.ejs');
});



module.exports = router;