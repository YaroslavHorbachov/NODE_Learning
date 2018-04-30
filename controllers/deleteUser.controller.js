const User = require('./../models/user').UserDoc;
class deleteUserController {
    static deleteUser (req, res) {
        const value = req.body;
        console.log('This value', value);
        User.findById(value._id)
            .then(data =>{
                User.find({})
                    .then(dataList => {
                        dataList.map(user =>{
                            user.leads = user.leads.filter(lead => lead !== data.email );
                            user.save()
                        })
                    }).then(() => data.remove())

            });
        res.send(req.user);
    }
}
module.exports = deleteUserController.deleteUser;