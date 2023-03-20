// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var ApplicationSchema = new mongoose.Schema({
    company: String,
    position: String,
    dateApplied: String,
    salary: String,
    notes: String,
    status: String
},{versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('Application', ApplicationSchema);
