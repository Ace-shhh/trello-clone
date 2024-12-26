const mongoose = require('mongoose');

const Counter = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    count : {
        type: Number,
        required : true,
    }
})

module.exports = new mongoose.model('Counter', Counter);