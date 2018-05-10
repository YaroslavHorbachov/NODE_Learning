const express = require('express');
const router = express.Router();
const LoggerController = require('../../controllers/logger.controller');
const getLeadsController = require('../../controllers/getLeads.controller');
const getUserController = require('../../controllers/getUserList.controller');
const emailAuthController = require('../../controllers/emailAuth.controller');
const deleteUserController = require('../../controllers/deleteUser.controller');
const updateAvatarController = require('../../controllers/updateAvatar.controller');
const resetPasswordController = require('../../controllers/resetPassword.controller');
const updateUserDataController = require('../../controllers/updateUserData.controller');
const updatePasswordController = require('../../controllers/updatePassword.controller');
const getMessageHistoryController = require('../../controllers/getMessageHistory.controller');
const updateUserDataAdminController = require('../../controllers/updateUserDataAdmin.controller');
const sendMessageController = require('../../controllers/sendMessage.controller').sendMessageController;
const getEmployeesController = require('../../controllers/getEmployees.controller').getEmployeesController;
const getMessagesListController = require('../../controllers/getMessage.controller').getMessagesListController;
const getPrivateUserController = require('../../controllers/getPrivateUser.controller').getPrivateUserController;
const getManagerListController = require('../../controllers/getManagerList.controller').getManagersList;
const setEmailSettingsController = require('../../controllers/setEmailSettings.controller').setEmailSettingsController;
const getEmailSettingsController = require('../../controllers/getEmailSettings.controller').getEmailSettingsController;
const getManagerCommentsController = require('../../controllers/getManagerComments.controller').getManagerCommentsController;
router.get('/api/getEmployees', (req, res) => {
        getEmployeesController(req, res);
    });
router.get('/api/getMessages', (req, res) => {
    getMessagesListController(req, res);
});
router.get('/api/message/history', (req, res) => {
    getMessageHistoryController(req,res)
});
router.get('/api/getUserList', (req, res) => {
    req.user.role === 'manager' ? getLeadsController( req ,res) : getUserController(res)
});
router.get('/log', (req, res) => {
    console.log(req.session);
    LoggerController(res)
});
router.get('/api/manager/list', (req, res) => {
    getManagerListController(req,res)
})
router.post('/api/manager/comment-list', (req, res)=> {
    getManagerCommentsController(req,res)
})
router.get('/api/user', (req, res) => {
    res.send(JSON.stringify(req.user))
});
router.get('/user/state', (req, res) => {
    console.log('Send User data');
    res.send(JSON.stringify(req.user))
});
router.post('/user/state/email', (req, res) => {
    getPrivateUserController(req, res)
})
router.get('/api/auth/email', (req, res) => {
    emailAuthController(req, res)
});
router.post('/api/deleteUser', (req, res) => {
    deleteUserController(req, res)
});
router.post('/api/user/password', (req, res) => {
    updatePasswordController(req, res)
})
router.post('/api/user/reset-password', (req, res) => {
    resetPasswordController(req, res)
})
router.get('/api/email/settings', (req, res) => {
    getEmailSettingsController(req, res)
})

router.post('/api/email/settings', (req, res) => {
    setEmailSettingsController(req, res)
})

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