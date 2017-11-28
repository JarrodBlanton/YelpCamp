var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = {};

// Checks to see if user is logged in. Redirects to login page if not logged in.
middleware.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Checks to see if viewed campground belongs to current user
middleware.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground) {
            if (err) {
                res.redirect('back');
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {// Sends user to previous route
        res.redirect('back');
    }
}

// Checks if comment belongs to current user
middleware.checkCommentOwnership = function(req, res, next) {
    // Check if user is logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.redirect('back');
            } else {
                if (comment.author.id.equals(req.user._id)) { // check if comment's auther is the current user
                    next();
                } else {
                    // user does not own comment
                    res.redirect('back');
                }
            }
        });
    } else {
        // user is not signed in
        res.redirect('back');
    }
}

module.exports = middleware;