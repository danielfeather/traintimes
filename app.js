require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
var helmet = require('helmet')

var index = require('./routes/index');
var station = require('./routes/station');

var app = express();

if(process.env.NODE_ENV){
  console.log(`You are running in ${process.env.NODE_ENV} mode`);
} else {
  console.log(`You must define the node environment in the .env file`);
  process.exit();
}

if(!process.env.TRANSPORT_API_KEY){ 
  console.log(`You have not defined your Transport API Key`); 
  process.exit();
}
if(!process.env.TRANSPORT_API_APPID){
  console.log(`You have not defined your Transport API App ID`); 
  process.exit();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', index);
app.use('/station', station);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
