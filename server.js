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
app.get('/seed', function (req, res) {
    // Remove any existing albums from the database
    db.Album.deleteMany({})
        .then(removedAlbums => {
            console.log(`Removed ${removedAlbums.deletedCount} albums from the collection`)
            // Seed the albums collection with the seed data
            db.Album.insertMany(db.seedAlbums)
                .then(addedAlbums => {
                    console.log(`Added ${addedAlbums.length} albums to the collection`)
                    res.json(addedAlbums)
                })
        })
});


// This tells our app to look at the `controllers/albums.js` file 
// to handle all routes that begin with `localhost:3000/albums`
app.use('/albums', albumsCtrl)


// The "catch-all" route: Runs for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.render('404')
});


/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
