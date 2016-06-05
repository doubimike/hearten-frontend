var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer'); 
var async = require('async');
var crypto = require('crypto');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var configDB = require('./config/database.js'); // get our config file
var User = require('./app/models/user'); // get our mongoose model

// middleware
app.use(favicon());
app.use(cookieParser());

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens


// deal post datd
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// set the view engine to ejs
app.set('views', path.join(__dirname, './build/views'));

app.set('view engine', 'ejs');

// 连接数据库
// mongoose.connect('mongodb://localhost/heartenfront');

mongoose.connect(configDB.database); // connect to database
app.set('superSecret', configDB.secret); // secret variable

require('./config/passport')(passport); // pass passport for configuration

// use morgan to log requests to the console
app.use(morgan('dev'));


// required for passport
app.use(session({ secret: 'iloveheartenfront',resave: true,
    saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// 设置静态文件
app.use(express.static('build/static'));


// routes ======================================================================
require('./app/controllers/index')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port,'0.0.0.0');