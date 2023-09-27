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
router.get('/', async (req, res) => {
    try {
        const reviews = await db.Review.find({})
        res.status(200).render('reviews/review-index', { reviews: reviews })
    } catch (error) {
        
    }
});

// New Route: GET localhost:3000/reviews/new/:albumId
router.get('/new/:albumId', async (req, res) => {
    const album = await db.Album.findById(req.params.albumId)
    res.render('reviews/new-form', { album: album })
})

// Create Route: POST localhost:3000/reviews/
router.post('/create/:albumId', (req, res) => {
    db.Review.findByIdAndUpdate(
        req.params.reviewId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(album => res.redirect('/reviews/review-index'))
});

// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    db.Review.findOne(
       { _id:req.params.id }
    )
    .then( review => {
        res.render('reviews/review-details', 
            { review: review }
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