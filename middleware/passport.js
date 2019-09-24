const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConnection = require("./dbConnection");

// Load User model
const User = require('../models/User');

module.exports = (passport) => {
    let user = '';
    passport.use(
        new LocalStrategy({ usernameField: 'email' },
            async(email, password, done) => {
                try {
                    let con = await dbConnection();
                    // Match user
                    sql = `SELECT * FROM tbl_user WHERE email ='${email}'`;
                    user = await con.query(sql);
                    if (user == '') {
                        return done(null, false, { message: 'That email is not registered' });
                    }
                    console.log(user);
                    let tempuser = JSON.parse(JSON.stringify(user));
                    console.log(tempuser);
                    // Match password
                    let isMatch = await bcrypt.compare(password, tempuser[0].password);
                    //bcrypt.compare(password, user.password);
                    console.log('from herre' + isMatch);
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log(`Added to session: ${user[0].name} `);
        done(null, user[0].id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            let con = await dbConnection();
            sql = `SELECT * FROM tbl_user WHERE id ='${id}'`;
            let user = await con.query(sql);
            if (user != '') {
                done(null, user[0]);
            }
        } catch (error) {
            throw err;
        }
    });
};