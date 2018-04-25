const passport = require('passport');

function loginGoogle() {
    app.get('/login/google',
        passport.authenticate('google',  {
            scope: ['https://www.googleapis.com/auth/plus.login'],
        })
    )
}



module.exports= loginGoogle;