var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest",
        image: "http://www.vwbblog.com/wp-content/uploads/2017/07/Cool-Campsites-in-London-and-Surrounding.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at pulvinar urna, vel porttitor sem. In dictum libero ut metus ultrices, eu gravida justo lobortis. Praesent nulla orci, tempor nec felis sed, finibus dapibus ex. Fusce euismod enim varius nunc laoreet, vitae malesuada massa iaculis. Pellentesque tristique semper metus, ac rhoncus augue pellentesque quis. Suspendisse nulla velit, convallis et ante in, pellentesque laoreet neque. Nunc malesuada malesuada tempor. Vestibulum dapibus malesuada dictum. Sed ut lacus quis sapien dictum aliquet a et risus. Nam porta faucibus diam, et pretium nibh dignissim id. Morbi a ipsum non sem pretium aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quis faucibus orci, at rutrum urna. Proin ultrices ipsum in lorem auctor tempus. Suspendisse tincidunt vehicula elit, nec porttitor ante gravida eu. Proin sodales, arcu et consectetur consectetur, turpis nulla dignissim tortor, hendrerit vehicula ex velit a diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras rhoncus nec enim at auctor. Quisque lectus felis, dapibus a viverra id, ultrices bibendum urna. Integer iaculis a ex vitae venenatis. Curabitur mattis, lectus id finibus convallis, dolor tortor iaculis arcu, id pellentesque purus nisi eget odio. Praesent porttitor dui id augue ultricies auctor. Nullam id convallis dolor. Praesent ut viverra nisi, et tincidunt purus. Pellentesque in tincidunt turpis."
    }, 
    {
        name: "Grassy Hills",
        image: "http://i.telegraph.co.uk/multimedia/archive/03325/kokopelli-8_3325134b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at pulvinar urna, vel porttitor sem. In dictum libero ut metus ultrices, eu gravida justo lobortis. Praesent nulla orci, tempor nec felis sed, finibus dapibus ex. Fusce euismod enim varius nunc laoreet, vitae malesuada massa iaculis. Pellentesque tristique semper metus, ac rhoncus augue pellentesque quis. Suspendisse nulla velit, convallis et ante in, pellentesque laoreet neque. Nunc malesuada malesuada tempor. Vestibulum dapibus malesuada dictum. Sed ut lacus quis sapien dictum aliquet a et risus. Nam porta faucibus diam, et pretium nibh dignissim id. Morbi a ipsum non sem pretium aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quis faucibus orci, at rutrum urna. Proin ultrices ipsum in lorem auctor tempus. Suspendisse tincidunt vehicula elit, nec porttitor ante gravida eu. Proin sodales, arcu et consectetur consectetur, turpis nulla dignissim tortor, hendrerit vehicula ex velit a diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras rhoncus nec enim at auctor. Quisque lectus felis, dapibus a viverra id, ultrices bibendum urna. Integer iaculis a ex vitae venenatis. Curabitur mattis, lectus id finibus convallis, dolor tortor iaculis arcu, id pellentesque purus nisi eget odio. Praesent porttitor dui id augue ultricies auctor. Nullam id convallis dolor. Praesent ut viverra nisi, et tincidunt purus. Pellentesque in tincidunt turpis."
    },
    {
        name: "Canyon Floor",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/e7/bd/15/a-pretty-cool-campsite.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at pulvinar urna, vel porttitor sem. In dictum libero ut metus ultrices, eu gravida justo lobortis. Praesent nulla orci, tempor nec felis sed, finibus dapibus ex. Fusce euismod enim varius nunc laoreet, vitae malesuada massa iaculis. Pellentesque tristique semper metus, ac rhoncus augue pellentesque quis. Suspendisse nulla velit, convallis et ante in, pellentesque laoreet neque. Nunc malesuada malesuada tempor. Vestibulum dapibus malesuada dictum. Sed ut lacus quis sapien dictum aliquet a et risus. Nam porta faucibus diam, et pretium nibh dignissim id. Morbi a ipsum non sem pretium aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quis faucibus orci, at rutrum urna. Proin ultrices ipsum in lorem auctor tempus. Suspendisse tincidunt vehicula elit, nec porttitor ante gravida eu. Proin sodales, arcu et consectetur consectetur, turpis nulla dignissim tortor, hendrerit vehicula ex velit a diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras rhoncus nec enim at auctor. Quisque lectus felis, dapibus a viverra id, ultrices bibendum urna. Integer iaculis a ex vitae venenatis. Curabitur mattis, lectus id finibus convallis, dolor tortor iaculis arcu, id pellentesque purus nisi eget odio. Praesent porttitor dui id augue ultricies auctor. Nullam id convallis dolor. Praesent ut viverra nisi, et tincidunt purus. Pellentesque in tincidunt turpis."
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