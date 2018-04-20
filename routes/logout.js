function logOut() {
    app.get('/logout', function (req, res) {
        req.logout();
        res.send(JSON.stringify({status: 'Log Out'}));
    });
}
module.exports = logOut;