var express = require('express');
var router = express.Router({mergeParams: true}); // Merge params allows app to give information to this route
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// NEW route
// Checks to make sure user is logged in before allowing user to make a new comment
router.get('/new', isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            return console.log(err);
        } else {
            res.render('comments/new', {campground: campground})
        }
    });
});

// CREATE route
// Take the requests body and create a comment. Add the comment to the associated campground as long as user is logged in
router.post('/', isLoggedIn, function(req, res) {
    var id = req.params.id
    // Search for campground
    Campground.findById(id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect('/campgrounds')
        } else {
            // Create comment using the comment object from the request's body
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    return console.log(err);
                }
                // Add comment to campground, then save and redirect
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/' + id);
            });
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

module.exports = router;