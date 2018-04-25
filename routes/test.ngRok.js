function testNgRok(){
    app.get('/user/test', (req,res) =>{
        console.log('Test place', req.user);
        res.send(JSON.stringify(req.user))
    })
}
module.exports = testNgRok;
