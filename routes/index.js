var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var User = require('../models/user');

// Root view for landing page
router.get('/', function(req, res) {
    res.render('landing');
});

// ==============
//  AUTH ROUTES
// ==============
// show registration form
router.get('/register', function(req, res) {
    res.render('register');
});

// Creates new user and adds to database
router.post('/register', function(req, res) {
    // grab username and password from body
    var username = req.body.username;
    var password = req.body.password;

    User.register({username: username}, password, function(err, user) {
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
    res.render('login');
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

module.exports = router;