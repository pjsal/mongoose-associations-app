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

// POST Song (create) - no page; just an action which will add a new entry
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

  // EDIT song - form where updates are made
  router.get('/:albumId/songs/:songId/edit', (req, res) => {
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    console.log("this is the song id:" + songId);
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
      // find song embedded in album
      // Mongoose code that will find the song we want by the id.  No need to loop through array.
      const foundSong = foundAlbum.songs.id(songId);
      // update song name on the form with data from request body
      res.render('songs/edit.ejs', { foundAlbum, foundSong });
    });
  });

// UPDATE Song (PUT) - no page; just an action that will update an entry
router.put('/:albumId/songs/:songId', (req, res) => {
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
  
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
        // find song embedded in album
        // Mongoose code that will find the song we want by the id.  No need to loop through array.
        const foundSong = foundAlbum.songs.id(songId);
        // update song name with data from request body
        foundSong.songName = req.body.songName;
        foundAlbum.save((err, savedAlbum) => {
            res.redirect(`/albums/${foundAlbum.id}`);
        });
    });
});


// DESTROY Album - no page; just an action that will delete an entry 
router.delete('/:albumId', (req, res) => {
    Album.findByIdAndRemove(req.params.albumId, (error) => {
      res.redirect('/albums');
    })
});

// DESTROY song - no page; just an action that will delete an entry 
router.delete('/:albumId/songs/:songId', (req, res) => {
    // set the value of the user and tweet ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
  
    // find album in db by id.  This can be replaced with an update method.  Then no save would be needed either.
    Album.findById(albumId, (err, foundAlbum) => {
      // find song embedded in album
      // Mongoose delete method.  This doesn't permanently persist the change in the DB.
      foundAlbum.songs.id(songId).remove();
      // This will save the changes in the database
      foundAlbum.save((err, savedAlbum) => {
        res.redirect(`/albums/${savedAlbum.id}`);
      });
    });
});


module.exports = router;