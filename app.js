require('dotenv').config();
var fs = require('fs');
var express = require('express');
var path = require('path');

var hbs = require('hbs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//DB Config
var dbURL = process.env.DB_CONFIG;
var mongoose = require('mongoose');
mongoose.connect(dbURL);

//Passport config
var secretkey = process.env.SECRET_KEY;
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({
    secret: secretkey,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./passport/init');
initPassport(passport);

hbs.registerPartials(__dirname + '/views/partials');

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// Set up app wide variables
app.locals.currentYear = new Date().getFullYear();
app.locals.companyName = process.env.COMPANY_NAME;

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
