var express = require('express');
var router = express.Router({mergeParams: true}); // Merge params allows app to give information to this route
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware'); // full route not required because index is name of the file


// NEW route
// Checks to make sure user is logged in before allowing user to make a new comment
router.get('/new', middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            return console.log(err);
        } else {
            res.render('comments/new', {campground: campground})
        }
    });
});

// CREATE route for comment
// Take the requests body and create a comment. Add the comment to the associated campground as long as user is logged in
router.post('/', middleware.isLoggedIn, function(req, res) {
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
                // Add username and id to post
                // Remember we can grab user from req body because it is now local
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                // Add comment to campground, then save and redirect
                campground.comments.push(comment);
                campground.save();
                console.log(comment);
                res.redirect('/campgrounds/' + id);
            });
        }
    });
});

// EDIT route: Edit a comment (the route is nested so :id needs to be different because :id is param held by campground)
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: comment});
        }
    });
});

// UPDATE route: Update a comment if it belongs to the user
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if (err) { // if error, send user back to form
            res.redirect('back');
        } else { // otherwise send to show form
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DELETE route: Delete a comment if it belongs to the user
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

module.exports = router;