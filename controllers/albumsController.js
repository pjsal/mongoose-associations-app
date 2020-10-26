const router = require('express').Router();
// Link to album model
const Album = require('../models/album').Album;
// Link to album model.  ***Song is part of the ALBUM model***
const Song = require('../models/album').Song;

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

// POST song (create) - no page; just an action which will add a new entry
router.post('/:albumId/songs', (req, res) => {
    console.log(req.body);
    // store new song in memory with data from request body/ 'Song' is from the models const statement at the top
    const newSong = new Song({ songName: req.body.songName });
  
    // find album in db by id and add new song.  
    Album.findById(req.params.albumId, (error, album) => {
      // Push new song to copy in memory
      album.songs.push(newSong);
      //This will persist it in the DB
      album.save((err, album) => {
        res.redirect(`/albums/${album._id}`);
      });
    });
  });


// DESTROY Album - no page; just an action that will delete an entry 
router.delete('/:albumId', (req, res) => {
    Album.findByIdAndRemove(req.params.albumId, (error) => {
      res.redirect('/albums');
    })
});




module.exports = router;