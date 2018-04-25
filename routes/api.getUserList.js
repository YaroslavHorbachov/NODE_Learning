const getUserController = require('../controllers/getUserList.controller')

function getUserList() {
    app.get('/api/getUserList', (req, res) => {
        getUserController(res)
    })
}
module.exports = getUserList;