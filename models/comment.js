var mongoose = require('mongoose');

var Comment = mongoose.model('Comment', {
   text: String,
   author: String
});

module.exports = Comment;