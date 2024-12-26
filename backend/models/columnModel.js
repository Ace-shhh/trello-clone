const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const columns = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    cards : [
        {   
            type : ObjectId,
            ref : 'Card'
        }
    ],
    order: {
        type: Number,
    }
},{timestamps: true})

module.exports = mongoose.model('columns', columns);