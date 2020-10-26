const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    "Serial_No": {
        type: String,
        required: true
    },
    "Email Address": {
        type: String,
        required: true,
        unique: true
    },
    "First_Name": {
        type: String,
        required: true
    },
    "Last_Name": {
        type: String,
        required: true
    },
    "Address": {
        type: String,
        required: true
    },
    "Activity_Log": {
        type: String,
        required: true
    },
    "DOB": {
        type: Date,
        required: true
    }
})



module.exports = mongoose.model('dataofuser', UserSchema)