const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Card = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    comments : [{
        type : ObjectId,
        ref : 'Comment'
    }],
    cardNumber: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Card', Card)