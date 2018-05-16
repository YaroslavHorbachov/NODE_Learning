const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./../models/user').UserDoc,
    ngRokHttps = 'https://80a253de.ngrok.io/login/auth/facebook',
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    bcrypt = require('bcryptjs');

const FACEBOOK = {
    ID: "436030020177660",
    SECRET: "ccaf8ac1cae7e607f7bf3375e06a8823"
};
const GOOGLE = {
    secret: 'HCUNzxXtl98ymUAZe6in4m86',
    id: '5931578132-ppar6scijf0elhhh44m3vja5id2bhgbd.apps.googleusercontent.com'
};

/* LOCAL */
passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    function (username, password, done) {
        User.findOne({email: username}, (err, doc) => {
            if (err) {
                console.error('Critical Error with DB', err);
                done(err);
            }
            else {
                    if (doc) {
                        if (doc.isEmailAuth === 'true') {
                        bcrypt.compare(password, doc.password)
                            .then(res => console.log('Res ', res))
                            .catch(err => console.log('Err ', err));
                        if (bcrypt.compareSync(password, doc.password)) {
                            console.log(doc)
                            done(null, {
                                fname: doc.fname,
                                id: doc._id,
                                status: 'done',
                                role: doc.role
                            })
                        }
                        else {
                            done(null, false)
                        }
                    }
                    else {
                        done(null, false)
                    }
                }
                else {done(null, false)}
            }
        })
    }))

/* FACEBOOK */
passport.use(new FacebookStrategy({
        clientID: FACEBOOK.ID,
        clientSecret: FACEBOOK.SECRET,
        callbackURL: ngRokHttps,
        profileFields: ['id', 'email', 'name']
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        const data = profile._json;
        const user = new User({
            fname: data.first_name,
            lname: data.last_name,
            email: data.email,
            fid: data.id
        });
        User.findOne({fid: user.fid}).then((data) => {
            if (data) {
                return done(null, data);
            } else {
                user.save().then(doc => {
                        done(null, doc)
                    }
                )
            }
        })
    }
));
/*GOOGLE */
passport.use(new GoogleStrategy({
        clientID: GOOGLE.id,
        clientSecret: GOOGLE.secret,
        callbackURL: "http://localhost:3020/login/auth/google/"
    },
    function (accessToken, refreshToken, profile, done) {
        // console.log('Here', profile);
        const user = new User({
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            gid: profile.id
        });
        User.findOne({fid: user.fid}).then((data) => {
            if (data) {
                return done(null, data);
            } else {
                user.save().then(doc => {
                        done(null, doc)
                    }
                )
            }
        }).catch(err => done(err, false))
    }
));

/* SERIALIZE */
passport.serializeUser(function (user, done) {
    done(null, user.id)
});

/* DESERIALIZE */
passport.deserializeUser(function (id, done) {
    User.findById(id, (err, doc) => {
        if (err) {
            // console.log(`Deserialize false user ...`, doc);
            done(err, false)
        } else {
            // console.log(`Deserialize user ...`, doc);
            return done(null, doc)
        }
    });
});

module.exports = passport;
