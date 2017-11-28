var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = {};

// Checks to see if user is logged in. Redirects to login page if not logged in.
middleware.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be logged in to do that');
    res.redirect('/login');
}

// Checks to see if viewed campground belongs to current user
middleware.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground) {
            // Some crazy shit to catch if a user tries to change the string of the ID to the exact same length as the original campground id
            if (err || !campground) {
                req.flash('error', 'Sorry! That campground does not exist!');
                res.redirect('/campgrounds');
            } else if (campground.author.id.equals(req.user._id) || req.user.isAdmin) {
                req.campground = campground;
                next();
            } 
            else {
                req.flash('error', 'You don\'t have permission to do that!' );
                res.redirect('/campgrounds/' + req.params.id);
            }
        });
    } else {// Sends user to previous route
        req.flash('error', 'You must be signed to edit your campground');
        res.redirect('/campgrounds/' + req.params.id);
    }
}

// Checks if comment belongs to current user
middleware.checkCommentOwnership = function(req, res, next) {
    // Check if user is logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            // Same thing here
            if (err || !comment) {
                req.flash('error', 'Sorry! That comment does not exist!');
                res.redirect('/campgrounds');
            } else if (comment.author.id.equals(req.user._id) || req.user.isAdmin) { // check if comment's auther is the current user
                req.comment = comment;    
                next();
            } else {
                // user does not own comment
                req.flash('error', 'You do not have permission to do that');
                res.redirect('/campgrounds/' + req.params.id);
            }
            
        });
    } else {
        // user is not signed in
        req.flash('error', 'You must be signed in to do that');
        res.redirect('/camgprounds/' + req.params.id);
    }
}

module.exports = middleware;