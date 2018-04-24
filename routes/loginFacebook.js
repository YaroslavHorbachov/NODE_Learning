const passport = require('passport');
const User = require('../models/user').UserDoc;
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK = {
    ID: "436030020177660",
    SECRET: "ccaf8ac1cae7e607f7bf3375e06a8823"
}


function loginFacebook() {
    app.get('/login/facebook',
        passport.authenticate('facebook', {scope: ["public_profile", "user_birthday"]})
    )
}

passport.use(new FacebookStrategy({
        clientID: FACEBOOK.ID,
        clientSecret: FACEBOOK.SECRET,
        callbackURL: "https://551f360c.ngrok.io/login/auth/facebook"
    },
    function (accessToken, refreshToken, profile, done) {
        // console.log('Here', profile);
        const [name, surname] = profile.displayName.split('  ');
        const user = new User({
            fname: name,
            lname: surname,
            fid: profile.id
        });
        User.findOne({fid: user.fid}).then((data) => {
            if (data) {
                // console.log('Ready document', data)
                return done(null, data)
            } else {
                user.save().then(doc => {
                        // console.log('Document here', doc);
                        done(null, doc)
                    }
                )
            }
        })
        /* if (User.find({fid:user.fid}).count() > 0) {done}
         user.save().then(() => {
             console.log(user);
             done(null, user)
         }).catch(err => done(err, false))*/
    }
))
module.exports = loginFacebook