var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// INDEX Route: view campgrounds
router.get('/', function(req, res){
    // Get all campgrounds from db
    Campground.find(function(err, campgrounds) {
        if (err) {
            return console.log(err);
        } else {
            // campgrounds is now all items in the db
            // retrieve user information from request body.
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    }); 
});

// CREATE Route: Add a new campground to database (REST concept)
router.post('/', function(req, res) {
    // REMEMBER: You obtain post data from the REQUEST's body
    // get data from site and add it to campgrounds array
    var name = req.body.name;
    var img = req.body.img;
    var descr = req.body.description;

    // Create new campground and save to db
    var newCampground = { name: name, image: img, description: descr };

    Campground.create(newCampground, function(err, campground) {
        if (err) { return console.log(err); }
        else {
            console.log(campground);
            // redirect back to /campgrounds 
            res.redirect('/campgrounds');
        }
    });
});

// NEW Route: Show form to add new campground
router.get('/new', function(req, res) {
    res.render('campgrounds/new');
});

// SHOW Route: Displays info about one particular page
router.get('/:id', function(req, res) {
    var id = req.params.id;
    // Populate the comments array with the data we need so we can access in the show file
    Campground.findById(id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            return console.log(err);
        } else {
            res.render('campgrounds/show', {campground: foundCampground})
        }
    });
});

// Checks to see if user is currently logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Export the router and its added routes
module.exports = router;