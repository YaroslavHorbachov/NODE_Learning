const User = require('../models/user').UserDoc;

function getEmployeesService(id, res){
    User.findById(id)
        .then((data) => {
            User.find({})
                .then((listUsers) => {
                    const employeesList = listUsers.filter(user => user.leads.includes(data.email));
                    res.send(JSON.stringify(employeesList));
                })
        })
        .catch((err) => console.log('Throw from getEmployees', err))
}
module.exports.getEmployeesService = getEmployeesService;