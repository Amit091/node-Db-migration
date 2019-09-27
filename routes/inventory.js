const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/mySQLInventoryController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', inventoryController.getIndex);

router.get('/new', ensureAuthenticated, inventoryController.getNewitemPage);

router.post('/new', ensureAuthenticated, inventoryController.postNewItem);

router.get('/getAll', inventoryController.getAllData);

router.delete('/delete/:id', ensureAuthenticated, inventoryController.getDeleteData);

module.exports = router;