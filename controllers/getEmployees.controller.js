const getEmployeesService = require('../services/getEmployees.service').getEmployeesService;

function getEmployeesController(req, res) {
    const id = req.user ? req.user.id : getIdFromCookie(req);
    console.log(id);
    getEmployeesService(id, res);
}
function getIdFromCookie(req){
    const cookies = req.cookies.isAuth;
    return JSON.parse(cookies.split('&')[1]).id
}

module.exports.getEmployeesController = getEmployeesController;
module.exports.getIdFromCookie = getIdFromCookie;