const passport = require('passport')
function loginAuthFacebook() {
    app.get('/login/auth/facebook',
        passport.authenticate('facebook'),
        (req, res) => {
        // console.log('Callback ', req.user)
        res.redirect('http://localhost:4200/login')
    })
}

module.exports = loginAuthFacebook