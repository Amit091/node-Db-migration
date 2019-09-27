const chalk = require('chalk');
const warningmsg = chalk.keyword('orange');

const dbConnection = require("./dbConnection");

const inventoryController = require('./mySQLInventoryController');


exports.getIndex = async(req, res, next) => {
    console.log('herer');

    try {
        inventoryController.getIndex;
    } catch (e) {
        console.log(warningmsg(`Closed Due to Error`) + e);
    }
};
exports.getDashboard = async(req, res, next) => {
    try {
        console.log('dashboard' + req.user);
        res.render('user/dashboard', { user: req.user });
    } catch (error) {
        console.log(error);
    }
};

exports.getProfile = async(req, res, next) => {
    try {
        res.render('user/profile', { user: req.user });
    } catch (error) {
        res.render('user/profile', { user: req.user });
    }
};