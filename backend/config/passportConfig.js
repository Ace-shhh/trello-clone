const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
},
async(accessToken, refreshToken, profile, done)=>{
    try{
        let user = await User.findOne({ googleId : profile.id });
        if(!user){
            user = await User.create({
                googleId : profile.id,
                username : profile.displayName,
                email : profile.emails[0].value,
                profilePicture : profile._json.picture,
            });
           
        };
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn : "1h"});
        return done(null, {user, token});
    }
    catch(error){
        console.log("error in google strategy", error)
        return done(error, null);
    }
}
));