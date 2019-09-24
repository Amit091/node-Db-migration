const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');


const app = express();

//Passport config
require('./middleware/passport')(passport);

//DB config
const db = require('./middleware/keys').MongoURI;

//Connect mongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(error =>
    console.log(`Connection Failed #${error}`)
);

app.use(logger('dev'));
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//express session
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
    duration: 1000 * 1,

}));

app.use(passport.initialize());
app.use(passport.session());

//connect-flash
app.use(flash());

//global variable
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Running App`));