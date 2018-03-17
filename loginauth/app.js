var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var moment = require('moment');



var app = express();
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');


var categories = require('./routes/categories');
var posts = require('./routes/posts');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var validate = require('form-validate');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));



app.use(passport.initialize());
app.use(passport.session());

/* app.use(passport.authenticate('remember-me')); */


/* app.get('/uploads/:imagename', function(req, res, next){
  console.log(req.params.imagename);
}); */

app.use('/uploads', express.static('uploads'))


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash(""));

app.use(function (req, res, next) {
  console.log("===========inside app");
  res.locals.messages = require('express-messages')(req, res);
  next();
});




app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/categories', categories);
app.use('/posts', posts);

/* app.post('*', function(req, res, next){
 
  //res.locals.user = req.user || null;
  
  next();
}); */


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
