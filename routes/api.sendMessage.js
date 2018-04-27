const UserDoc = require('../models/user').UserDoc;
const Comment = require('../models/user').CommentDoc;
const getIdByCookie = require('../controllers/getEmployees.controller').getIdFromCookie
function sendMessage(){
    app.post('/api/sendMessage', (req, res)=>{
       async function sendMessageController(req,res){
           let lead;
           if(req.user){
               lead = req.user.email;
           } else {
               lead = await getLead(req);
           }
           const message = req.body.message;
           const employee = req.body.employee;
           console.log('HERE MESSAGE', req.body);
           const date = req.body.date;
           const comment = new Comment({
               lead,
               message,
               employee,
               date
           });
           comment.save()
               .then(() => res.send(JSON.stringify({status: 'done'})))
               .catch(err =>{console.log('Problem on save comment', err)
           })
       }
       sendMessageController(req,res)
    })
}
function getLead(req){
    return new Promise((res, rej) =>{
        const idLead = getIdByCookie(req);
        UserDoc
            .findById(idLead)
            .then(doc => res(doc.email))
            .catch(err => rej(err))
    })
}
module.exports = sendMessage;