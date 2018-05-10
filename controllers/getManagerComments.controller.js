const dispatch = require('../core/config/utils/dispatch')
const CommentDoc = require('../models/user').CommentDoc;

function getManagerCommentsController(req,res){
    dispatch(req,res,actor)
}
function * actor(req){
    const [ d, {id}]= [req.body, req.user];
    const baseComments = yield CommentDoc.find({manager: id});
    return baseComments.filter(message => message.manager === id);
}
module.exports = {
    getManagerCommentsController
};