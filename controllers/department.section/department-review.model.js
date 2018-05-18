class ReviewActionRequest {
    constructor({author, employer }){
        this.author = author;
        this.employer = employer;
    }
}
const ErrorHandler = ({res, text, error}) => {
        console.log(text, error.errmsg);
        res.send({error})
    }


module.exports = {
    ReviewActionRequest,
    ErrorHandler
}
