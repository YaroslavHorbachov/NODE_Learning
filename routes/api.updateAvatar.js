const updateAvatarController = require('../controllers/updateAvatar.controller');
function change() {
    app.post('/api/change', (req, res) => {
        updateAvatarController(req, res)
    }
)}
module.exports = change;