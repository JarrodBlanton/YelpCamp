var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var middleware = require('../middleware'); // full route not required because index is name of the file

// INDEX Route: view campgrounds
router.get('/', function(req, res){
    // Get all campgrounds from db
    Campground.find(function(err, campgrounds) {
        if (err) {
            return console.log(err);
        } else {
            // campgrounds is now all items in the db
            // retrieve user information from request body.
            res.render('campgrounds/index', {campgrounds: campgrounds, page: 'campgrounds'});
        }
    }); 
});

// CREATE Route: Add a new campground to database (REST concept)
router.post('/', middleware.isLoggedIn, function(req, res) {
    // REMEMBER: You obtain post data from the REQUEST's body
    // get data from site and add it to campgrounds array
    var name = req.body.name;
    var img = req.body.img;
    var descr = req.body.description;

    // Create new campground and save to db
    var newCampground = { 
        name: name,
        image: img,
        price: req.body.price, // New value from dynamic pricing version
        description: descr,
        // Now adding author information to the campground model
        author: {
            id: req.user._id,
            username: req.user.username
        } 
    };

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
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// SHOW Route: Displays info about one particular page
router.get('/:id', function(req, res) {
    var id = req.params.id;
    // Populate the comments array with the data we need so we can access in the show file
    Campground.findById(id).populate('comments').exec(function(err, foundCampground) {
        // Additional error handling
        if (err || !foundCampground) {
            console.log(err);
            req.flash('error', 'Sorry! That campground does not exist!');
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/show', {campground: foundCampground})
        }
    });
});

// EDIT Route: Allows user to edit information about a campground as long as the campground belongs to the current user
router.get('/:id/edit', middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req, res) {  
    Campground.findById(req.params.id, function(err, foundCG) {
        res.render('campgrounds/edit', {campground: foundCG});
    });   
});

// UPDATE Route: Updates the campground with the newly added info
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    // Find and update correct campground
    // req.body.campground was done by setting name attribute for each input tag to name="campground[x]"
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCG) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        }
        res.redirect('/campgrounds/' + req.params.id);
    });
});

router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/campgrounds');
    });
});
   
// Export the router and its added routes
module.exports = router;