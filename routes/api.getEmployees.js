const User = require('./../models/user').UserDoc;

function getEmployees (){
    app.get('/api/getEmployees', (req,res)=>{
        function getEmployeesController(req, res){
           const cUser = req.user;
            User.findById(cUser.id)
                .then((data) => {
                    User.find({})
                        .then((listUsers) =>{
                            const employeesList = listUsers.filter(user => user.leads.includes(data.email));
                            res.send(JSON.stringify(employeesList));
                        })
                })
                .catch((err) => console.log('Throw from getEmployees', err))
        }
        getEmployeesController(req,res);
    })
}
module.exports = getEmployees;