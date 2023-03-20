// Load required packages
var mongoose = require('mongoose');
const application = require('./application');

// Define our user schema
var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    applications: [String],
},{versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
