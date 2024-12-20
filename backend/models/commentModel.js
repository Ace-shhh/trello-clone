const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;
const Comment = new mongoose.Schema({
    comment : {
        type : String,
        required: true,
    },
    user : {
        type: ObjectId,
        ref: 'User',
        required : true,
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Comment', Comment);