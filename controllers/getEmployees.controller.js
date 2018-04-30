const getEmployeesService = require('../services/getEmployees.service').getEmployeesService;

class EmployeesController{
    static getEmployees(req, res) {
        const id = req.user ? req.user.id : CookieController.getId(req);
        console.log(id);
        getEmployeesService(id, res);
    }
}

class CookieController {
    static getId(req){
        const cookies = req.cookies.isAuth;
        return JSON.parse(cookies.split('&')[1]).id
    }
}

module.exports.getEmployeesController = EmployeesController.getEmployees;
module.exports.getIdFromCookie = CookieController.getId;