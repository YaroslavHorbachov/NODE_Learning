function getUserData(){
    app.get('/user/state', (req, res) =>{
        console.log('Send User data');
        res.send(JSON.stringify(req.user))
    })
}
module.exports = getUserData;