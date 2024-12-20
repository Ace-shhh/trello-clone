const mongoose = require ('mongoose');
const bcrypt = require("bcrypt")
const {ObjectId} = mongoose.Schema.Types;
const User = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, "Please provide a valid email address"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],   
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
    },
    profilePicture:{
        type: String
    },
    
    ownWorkspaces: [{
        type: ObjectId,
        ref : 'Workspace' 
    }],
    otherWorkspaces:[{
        type: ObjectId,
        ref: 'Workspace'
    }]
}, {timestamps : true})


User.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

module.exports = mongoose.model('User', User)