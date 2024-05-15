const mongoose = require('mongoose');


const watchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbols: [{
        type: String,
        required: true
    }]
},{ timestamps: true });

module.exports = mongoose.model("UserWatchlists",watchlistSchema);
