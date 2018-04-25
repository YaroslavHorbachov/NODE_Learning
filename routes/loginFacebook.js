const passport = require('passport');
function loginFacebook() {
    app.get('/login/facebook',
        passport.authenticate('facebook', {scope: ["public_profile", "user_birthday"]})
    )
}
module.exports = loginFacebook;