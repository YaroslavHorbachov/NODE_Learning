const updateUserDataController = require('../controllers/updateUserData.controller');
const updateUserDataAdminController = require('../controllers/updateUserDataAdmin.controller');

function getUser() {
    app.get('/api/user', (req, res) => {
        res.send(JSON.stringify(req.user))
    });
    app.post('/api/user', (req, res) => {
        const value = req.body,
            id = req.user._id;
        if(value.status === 'admin') {
            const email = value.email;
            updateUserDataAdminController(email,value,res);
        } else {
            updateUserDataController(id, value, res)
        }
    })
}

module.exports = getUser;