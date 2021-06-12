const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const dbConnection = require("../middleware/dbConnection");
const curDate = require('./../helpers/getDate');

var sql = "";

exports.getLogin = (req, res) => {
    console.log('Login');
    console.log(curDate.getDate(new Date()));
    res.render('user/login');
};

exports.getRegister = (req, res) => {
    res.render('user/register');
};

exports.postRegister = async(req, res) => {
    console.log('register post');
    let con = await dbConnection();
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('user/register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        try {
            console.log(email);
            sql = `SELECT * FROM tbl_user WHERE email ='${email}'`;
            const user = await con.query(sql);
            console.log(user);
            if (user != '') {
                errors.push({ msg: 'Email already exists' });
                res.render('user/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(newUser.password, salt);
                newUser.password = hash;
                sql = `INSERT INTO tbl_user (name,email,password,date) VALUE
                    ('${newUser.name}','${newUser.email}','${newUser.password}','${curDate.getDate(new Date())}')`;
                const savedUser = await con.query(sql);
                if (savedUser) {
                    req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                    );
                    res.redirect('/users/login');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
};

exports.postLogin = async(req, res, next) => {
    await passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
    console.log(req.session);
}

exports.getLogout = (req, res) => {
    req.logout();
    req.flash('warning_msg', 'You are logged out');
    res.redirect('/users/login');
};