const mongoose = require("mongoose");

const ConfereceSchema = new mongoose.Schema({
   title: {
        type: String,
        required: true
   },
   description: {
        type: String,
        required: true
   },
   schedule: {
        type: String,
        required: true
   },
   location: {
        type: String,
        required: true
   }
});

module.exports = mongoose.model('Conference', ConfereceSchema)