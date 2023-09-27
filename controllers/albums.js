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
            res.render('albums/album-index', {
                albums: albums
            })
        })
})


// New Route (GET/Read): This route renders a form which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    res.render('albums/new-form')
})


// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new album document using the form data, 
// and redirects the user to the new album's show page
router.post('/', (req, res) => {
    db.Album.create(req.body)
        .then(album => res.redirect('/albums/' + album._id))
})


// Show Route (GET/Read): Will display an individual album document
router.get('/:id', function (req, res) {
    db.Album.findById(req.params.id)
        .then(album => {
            res.render('albums/album-details', {
                album: album
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})


// Edit Route (GET/Read): This route renders a form to edit an album document
router.get('/:id/edit', (req, res) => {
    db.Album.findById(req.params.id)
        .then(album => res.render('albums/edit-form', { album: album }))
})


// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified pet document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    console.log(req.params.id);  
    
    db.Album.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    .then(album => res.redirect('/albums/' + album._id))
});


// Destroy Route (DELETE/Delete): This route deletes an album document
router.delete('/:id', (req, res) => {
    db.Album.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/albums'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
