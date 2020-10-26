const router = require('express').Router();
const Album = require('../models/album').Album;
const Song = require('../models/user').Song;

// ROUTES
// INDEX for Albums - main menu
router.get('/', (req, res) => {
    //Find all albums in the database 
    Album.find({}, (error, allAlbums) => {
        res.render('albums/index.ejs', {
            albums: allAlbums
        })
    });
    // res.render('albums/index.ejs');
});


// POST Album (create) - no page; just an action which will add a new entry
router.post('/', (req, res) => {
    Album.create(req.body, (error, album) => {
        res.redirect('/albums/');
    })
})




module.exports = router;