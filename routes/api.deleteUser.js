const deleteUserController = require('../controllers/deleteUser.controller');
function deleteUser() {
    app.post('/api/deleteUser', (req, res) => {
       deleteUserController(req, res)
    })
}
module.exports = deleteUser;

