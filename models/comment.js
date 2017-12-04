var mongoose = require('mongoose');

var Comment = mongoose.model('Comment', {
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    // store the author inside the comment
    // only non-relational databases can do this 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //ref is the model that we will be referring to
        },
        username: String
     }
});

module.exports = Comment;