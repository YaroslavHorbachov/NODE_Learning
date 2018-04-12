function login() {
    app.get('/login', (req, res) => {
        res.redirect('/register')
    });

}

module.exports = login