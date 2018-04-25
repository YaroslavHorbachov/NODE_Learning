const passport = require('passport');

function login() {
    app.post('/login',
        passport.authenticate('local'),
        (req, res) => {
            console.log('After passport ', req.session);
            res.send(req.user)
        }
    )
}
module.exports = login;

