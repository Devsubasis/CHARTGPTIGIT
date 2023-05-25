require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var client = require('./Routers/client');
//var admin = require('./Routers/admin');
var home = require('./Routers/home');
var chatgpt = require('./Routers/chat');
var app = express();
var port = process.env.PORT || 3000

// view engine setup
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
//session setting
app.use(session({ 
  secret: 'w3codeschool.com',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 5*60*10000 }
}))
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Public')));
app.use(flash());
//app.use(expressValidator());
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});
app.use('/', home);
app.use('/chatgpt', chatgpt);
app.use('/user', client);
//app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('404');
});
//setInterval(func, 5*1000);
//Running App
app.listen(port, function () {
    console.log(`App is running on port: http://localhost:${port}`);
});
module.exports = app;