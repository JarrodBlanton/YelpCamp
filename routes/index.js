var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var User = require('../models/user');
var Campground = require('../models/campground');

// Root view for landing page
router.get('/', function(req, res) {
    res.render('landing');
});

// ==============
//  AUTH ROUTES
// ==============
// show registration form
router.get('/register', function(req, res) {
    res.render('register', {page: 'register'});
});

// Creates new user and adds to database
router.post('/register', function(req, res) {
    // grab username and password from body
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar
    });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            return res.render('register', {'error': err.message});
        } else {
            // Redirect to campgrounds page if user is authenticated correctly
            passport.authenticate('local')(req, res, function() {
                req.flash('success', 'Thank you for registering, ' + user.username + '!'); // Give user welcome message
                res.redirect('/campgrounds');
            });
        }
    });
});

// Show login form for user
router.get('/login', function(req, res) {
    res.render('login', {page: 'login'});
});

// Handles login logic for user
// .authenticate is a middleware provided by the passport-local-mongoose package
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    })
    // Do not need to add empty callback function
);

// Logout route
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Goodbye!')
    res.redirect('/campgrounds');
});

// User Route
router.get('/users/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            req.flash('error', "Something went wrong!");
            res.redirect('/');
        }
        // eval(require("locus"));
        console.log(user)
        Campground.find().where('author.id').equals(user._id).exec(function(err, campgrounds) {
            if (err) {
                req.flash('error', "Something went wrong!");
                res.redirect('/');
            }
            res.render('users/show', {user: user, campgrounds: campgrounds});            
        });      
    });
});


module.exports = router;