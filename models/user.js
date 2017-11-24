var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Create new schema for our user model
var UserSchema = new mongoose.Schema({
    username: String,
    password: String 
});

// Add extra methods to the User model 
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);