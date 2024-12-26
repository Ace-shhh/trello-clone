const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const Workspace = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    description: {
        type: String
    },
    members : [{
        userId: {
            type: ObjectId,
            ref: 'User'
        },
        role : {
            type : String,
            enum : ['admin', 'member', 'guest', 'owner']
        }
    }],
    boards : [{
        type : ObjectId,
        ref : 'Board'
    }]
}, {timestamps : true});


module.exports = mongoose.model('Workspace', Workspace);
