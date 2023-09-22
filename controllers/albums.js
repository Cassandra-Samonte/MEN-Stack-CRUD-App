// All routes on this page are prefixed with `localhost:3000/albums`


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all albums 
router.get('/', function (req, res) {
    db.Album.find({})
        .then(albums => {
            res.render('album-index', {
                albums: albums
            })
        })
})


// Show Route (GET/Read): Will display an individual album document
router.get('/:id', function (req, res) {
    db.Album.findById(req.params.id)
        .then(album => {
            res.render('album-details', {
                album: album
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
