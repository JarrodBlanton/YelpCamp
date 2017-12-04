var mongoose = require('mongoose');

// Initiate model and schema for campground
var Campground = mongoose.model('Campground', {
    name: String,
    price: Number,
    image: String, 
    description: String,
    // Values for Google Maps
    location: String,
    lat: Number,
    lng: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Embed a object reference to the comments
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        // Same functionality as the author object in model for comment
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = Campground;