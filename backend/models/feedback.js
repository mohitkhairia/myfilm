const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    conferenceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conference',
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema)