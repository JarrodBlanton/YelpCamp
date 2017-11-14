var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest",
        image: "http://www.vwbblog.com/wp-content/uploads/2017/07/Cool-Campsites-in-London-and-Surrounding.jpg",
        description: "blah blah blah"
    }, 
    {
        name: "Grassy Hills",
        image: "http://i.telegraph.co.uk/multimedia/archive/03325/kokopelli-8_3325134b.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/e7/bd/15/a-pretty-cool-campsite.jpg",
        description: "blah blah blah"
    }
];

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('removed campgrounds');
             // Add new campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        return console.log(err);
                    } else {
                        console.log("Added a campground!");
                        // Create a comment on each campground  
                        Comment.create(
                            {
                                text:"This place is great, but I wish there was internet!",
                                author: "Homer"
                            }, function(err, comment) {
                                if (err) {
                                    return console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment!");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;