function logOut() {
    app.get('/logout', function (req, res) {
        console.log('Logout here')
        req.logout();
        res.send(JSON.stringify({status: "Log OUT"}));
    });
}

module.exports = logOut;