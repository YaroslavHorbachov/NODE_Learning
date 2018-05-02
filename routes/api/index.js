const express = require('express');
const router = express.Router();
const LoggerController = require('../../controllers/logger.controller');
const getUserController = require('../../controllers/getUserList.controller');
const emailAuthController = require('../../controllers/emailAuth.controller');
const deleteUserController = require('../../controllers/deleteUser.controller');
const updateAvatarController = require('../../controllers/updateAvatar.controller');
const updateUserDataController = require('../../controllers/updateUserData.controller');
const updateUserDataAdminController = require('../../controllers/updateUserDataAdmin.controller');
const sendMessageController = require('../../controllers/sendMessage.controller').sendMessageController;
const getEmployeesController = require('../../controllers/getEmployees.controller').getEmployeesController;
const getMessagesListController = require('../../controllers/getMessage.controller').getMessagesListController;
const getPrivateUserController = require('../../controllers/getPrivateUser.controller').getPrivateUserController;

router.get('/api/getEmployees', (req, res) => {
        getEmployeesController(req, res);
    }
);
router.get('/api/getMessages', (req, res) => {
    getMessagesListController(req, res);
});
router.get('/api/getUserList', (req, res) => {
    getUserController(res)
});
router.get('/log', (req, res) => {
    console.log(req.session);
    LoggerController(res)
});
router.get('/api/user', (req, res) => {
    res.send(JSON.stringify(req.user))
});
router.get('/user/state', (req, res) => {
    console.log('Send User data');
    res.send(JSON.stringify(req.user))

});
router.post('/user/state/email', (req,res) =>{
    console.log('#1', req.body)
    getPrivateUserController(req,res)
})
router.get('/api/auth/email', (req, res) => {
    emailAuthController(req, res)
});
router.post('/api/deleteUser', (req, res) => {
    deleteUserController(req, res)
});
router.post('/api/user', (req, res) => {
    const value = req.body,
        id = req.user._id;
    if (value.status === 'admin') {
        const email = value.email;
        updateUserDataAdminController(email, value, res);
    } else {
        updateUserDataController(id, value, res)
    }
});
router.post('/api/sendMessage', (req, res) => {
    sendMessageController(req, res)
});
router.post('/api/change', (req, res) => {
    updateAvatarController(req, res)
});

module.exports = router;