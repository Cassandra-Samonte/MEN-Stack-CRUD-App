// All routes on this page are prefixed with `localhost:3000/reviews`

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


// Index Route (All Reviews) - Need '/review-index' to access show route 
router.get('/review-index', async (req, res) => {
    try {
        const reviews = await db.Review.find({})
        res.status(200).render('reviews/review-index', { reviews: reviews })
    } catch (error) {
        console.error(error);
        res.send("Error fetching reviews.");
    }
});


// New Route: GET localhost:3000/reviews/new/:albumId
router.get('/new/:albumId', async (req, res) => {
    const album = await db.Album.findById(req.params.albumId)
    res.render('reviews/new-form', { album: album })
})


// Create Route: POST localhost:3000/reviews/
router.post('/create/:albumId', async (req, res) => {
    try {
        const newReview = await db.Review.create(req.body);
        const album = await db.Album.findById(req.params.albumId);
        album.reviews.push(newReview._id);
        await album.save();
        
        res.redirect('/reviews/review-index');
    } catch (error) {
        console.error(error);
        res.send("Error creating review");
    }
});


// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {

    db.Review.findOne({ _id: req.params.id })
    .then(review => {
        res.render('reviews/review-details', { review: review });
    })

});


// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', async (req, res) => {
        const reviewId = req.params.id;
        
        await db.Review.findByIdAndDelete(reviewId);
   
        await db.Album.updateMany(
            { reviews: reviewId },
            { $pull: { reviews: reviewId } }
        );
        
        res.redirect('/reviews');
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router