var mongoose = require('mongoose');

// Initiate model and schema for campground
var Campground = mongoose.model('Campground', {
    name: String,
    image: String, 
    description: String,
    // Embed a object reference for database
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = Campground;