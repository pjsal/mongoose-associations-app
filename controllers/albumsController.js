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

// NEW Album - form where new entries are made
router.get('/new', (req, res) => {
    res.render('albums/new.ejs');
});

// SHOW Album - form where new song entries are made
router.get('/:albumId', (req, res) => {
    // Get album ID from URL and pass to show page
    Album.findById(req.params.albumId, (error, album) => {
        res.render('albums/show.ejs', {album})
    })
});

// POST Album (create) - no page; just an action which will add a new entry
router.post('/', (req, res) => {
    // res.send (req.body);
    Album.create(req.body, (error, album) => {
        res.redirect('/albums/');
    })
});



// DESTROY Album - no page; just an action that will delete an entry 
router.delete('/:albumId', (req, res) => {
    Album.findByIdAndRemove(req.params.albumId, (error) => {
      res.redirect('/albums');
    })
});




module.exports = router;