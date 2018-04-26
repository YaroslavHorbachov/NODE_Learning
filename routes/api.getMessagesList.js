const CommentDoc = require('../models/user').CommentDoc;

function getMessagesList(){
    app.get('/api/getMessages', (req, res)=>{
        function getMessagesListController(req, res){
            const value = req.user;
            CommentDoc
                .find({lead: value.email})
                .then(data =>{
                    console.log('Message successfully find ', data);
                    res.send(JSON.stringify(data));
                })
                .catch(err =>{
                    console.log('Problem with searching messages ', err);
            })
        }
        getMessagesListController(req,res);
    })
}
module.exports = getMessagesList;