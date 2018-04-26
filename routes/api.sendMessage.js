const Comment = require('./../models/user').CommentDoc
function sendMessage(){
    app.post('/api/sendMessage', (req, res)=>{
       function sendMessageController(req,res){
           const lead = req.user.email;
           const message = req.body.message;
           const employee = req.body.employee;
           const comment = new Comment({
               lead,
               message,
               employee,
               date: new Date().toLocaleDateString()
           })
           comment.save()
               .then(() => res.send(JSON.stringify({status: 'done'})))
               .catch(err =>{console.log('Problem on save comment', err)
           })
       }
       sendMessageController(req,res)
    })
}
module.exports = sendMessage;