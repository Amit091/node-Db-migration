const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../middleware/auth');
const userController = require('./../controller/userController');

router.get('/login', forwardAuthenticated, userController.getLogin);

router.get('/register', forwardAuthenticated, userController.getRegister);

router.post('/register', userController.postRegister);

router.post('/login', userController.postLogin);

router.get('/logout', userController.getLogout);

module.exports = router;