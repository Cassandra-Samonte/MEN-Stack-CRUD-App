/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (All Reviews): 
router.get('/', (req, res) => {
    db.Album.find({}, { reviews: true, _id: false })
        .then(albums => {
            const flatList = []
            for (let album of albums) {
                flatList.push(...album.reviews)
            }
            res.render('reviews/review-index',
                { reviews: flatList }
            )
        })
});

// New Route: GET localhost:3000/reviews/new/:rugId
router.get('/new/:albumId', async (req, res) => {
    const album = await db.Album.findById(req.params.rugId)
    res.render('reviews/new-form', { album: album })
})

// Create Route: POST localhost:3000/reviews/
router.post('/create/:albumId', (req, res) => {
    db.Album.findByIdAndUpdate(
        req.params.albumId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(album => res.redirect('/reviews/'))
});

// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Album.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(album => {
            res.render('reviews/review-details',
                { review: rug.reviews[0] }
            )
        })
});

// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.Album.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(() => res.redirect('/reviews'))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router