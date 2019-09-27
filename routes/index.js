const express = require('express');
const router = express.Router();
const indexController = require('./../controller/indexController');
const SQlCon = require('./../controller/mySQLInventoryController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', SQlCon.getIndex);

router.get('/dashboard', ensureAuthenticated, indexController.getDashboard);

router.get('/profile', ensureAuthenticated, indexController.getProfile);

module.exports = router;