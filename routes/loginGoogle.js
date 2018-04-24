const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user').UserDoc;
const GOOGLE ={
    secret: 'HCUNzxXtl98ymUAZe6in4m86',
    id: '5931578132-ppar6scijf0elhhh44m3vja5id2bhgbd.apps.googleusercontent.com'
}
function loginGoogle() {
    app.get('/login/google',
        passport.authenticate('google',  {
            scope: ['https://www.googleapis.com/auth/plus.login'],
        })
    )
}
passport.use(new GoogleStrategy({
        clientID: GOOGLE.id,
        clientSecret: GOOGLE.secret,
        callbackURL: "http://localhost:3020/login/auth/google/"
    },
    function(accessToken, refreshToken, profile, done) {
            // console.log('Here', profile);
            const user = new User({
                fname : profile.name.givenName,
                lname : profile.name.familyName,
                gid: profile.id
            });
            user.save().then(() => {
                console.log(user);
                done(null,user)
            }).catch(err => done(err,false))
    }
));



module.exports= loginGoogle;