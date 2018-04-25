function testNgRokLogout(){
    app.get('/user/logout', (req,res)=>{
        console.log('Test logout');
        req.logout();
        res.send(JSON.stringify({status: "Log Out"}))
    })
}
module.exports = testNgRokLogout;