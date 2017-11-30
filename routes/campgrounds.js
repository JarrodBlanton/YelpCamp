var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var middleware = require('../middleware'); // full route not required because index is name of the file
var geocoder = require('geocoder');

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
    var location = req.body.location;

    // Use geocode middleware to get metadata about campground location 
    geocoder.geocode(location, function(err, data) {
        console.log('here!');
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var loc = data.results[0].formatted_address;
        // Create new campground with new information and save to db
        var newCampground = { 
            name: name,
            image: img,
            price: req.body.price, // New value from dynamic pricing version
            location: loc,
            lat: lat,
            lng: lng,
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
    // Get location data from edit request form. REMEMBER: sent via campground[x]
    geocoder.geocode(req.body.campground.location, function(err, data) {
        // Grab location metadata for map
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;

        // Store data to be updated in variable
        var newData = {
            name: req.body.campground.name,
            image: req.body.campground.image,
            price: req.body.campground.price, // New value from dynamic pricing version
            location: location,
            lat: lat,
            lng: lng,
            description: req.body.campground.description
        }

        // Find and update correct campground
        // req.body.campground was done by setting name attribute for each input tag to name="campground[x]"
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCG) {
            if (err) {
                req.flash('error', err.message);
                res.redirect('/campgrounds');
            } else {
                req.flash('success', 'Successfully updated!');
                res.redirect('/campgrounds/' + req.params.id);
            }
        });
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