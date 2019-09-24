const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

// router.get('*', (req, res) => {
//     res.render('Welcome');
// });

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    console.log('dashboard' + req.user);

    res.render('dashboard', { user: req.user });
});

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', { user: req.user });
});


module.exports = router;