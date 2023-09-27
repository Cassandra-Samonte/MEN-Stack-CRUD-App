/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const albumsCtrl = require('./controllers/albums')
const reviewsCtrl = require('./controllers/reviews')



/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());
// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));


/* Mount routes
--------------------------------------------------------------- */
// Home Route
app.get('/', function (req, res) {
    res.render('home');
});


// About Route
app.get('/about', function (req, res) {
    res.render('about')
});


/* Seed Route - When a GET request is sent to `/seed`, the albums collection is seeded */
app.get('/seed', async function (req, res) {
    try {
        await db.Album.deleteMany({}); 
        await db.Review.deleteMany({});
        const albums = await db.Album.insertMany(db.seedData.albums);
        const reviews = await db.Review.insertMany(db.seedData.reviews);
        res.status(200).json({ message:`Added ${albums.length} albums and ${reviews.length} reviews to the database` })
    } catch (error) {
        res.status(500).json(error)
    }
});


// This tells our app to look at the `controllers/albums.js` file 
// to handle all routes that begin with `localhost:3000/albums`
app.use('/albums', albumsCtrl)
// This tells our app to look at the `controllers/reviews.js` file 
app.use('/reviews', reviewsCtrl)



// The "catch-all" route: Runs for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.render('404')
});


/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
