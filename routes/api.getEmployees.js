const getEmployeesController = require('../controllers/getEmployees.controller').getEmployeesController

function getEmployees() {
    app.get('/api/getEmployees', (req, res) => {
            getEmployeesController(req, res);
        }
    )
}


module.exports = getEmployees;