const passport = require('passport');

exports.loginGoogle = passport.authenticate('google', { scope : ['profile', 'email'] });



exports.googleCallback = (req, res, next)=>{
    passport.authenticate("google", {session : false},
        (err, data)=>{
        const { token, user } = data;
        if(err || !data){
            return res.redirect('http://localhost:5173/login?error=authentication_failed');
        }

        return res.redirect(`http://localhost:5173?token=${token}&userId=${user.googleId}`)
    })(req, res, next);
};

exports.protectedRoute = (req, res)=>{
    res.json({ message : "You have accessed a protected route", user : req.user});
};