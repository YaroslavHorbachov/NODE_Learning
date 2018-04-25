const passport = require('passport')

function loginAuthFacebook() {
    app.get('/login/auth/facebook',
        passport.authenticate('facebook', {scope: ['email', 'public_profile']}),
        (req, res) => {
            res.redirect('http://localhost:4200/login')
        })
}

module.exports = loginAuthFacebook