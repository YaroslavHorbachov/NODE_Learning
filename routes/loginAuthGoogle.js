const passport = require('passport');

function loginAuthGoogle() {
    app.get('/login/auth/google', passport.authenticate('google'),
        (req, res) => {
            // console.log('Successfully catch callback ')
            res.redirect('http://localhost:4200/login')
        })
}

module.exports = loginAuthGoogle;