const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jobProfiles = new mongoose.Schema({
    "ID": {
        type: String,
        required: true
    },
    "Job Title": {
        type: String,
        required: true
    },
    "Email Address": {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('JobProfile', jobProfiles)