const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const Board = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    columns : [{
        type : ObjectId,
        ref: 'columns'
    }]
})

module.exports = mongoose.model('Board', Board);