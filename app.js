const config = require('./config');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const helmet = require('helmet')

const index = require('./routes/index');
const station = require('./routes/station');

const app = express();

if(process.env.NODE_ENV){
  	switch(process.env.NODE_ENV){
		case 'production':
		console.log('\x1b[32m%s\x1b[0m', `You are running in production mode`);
		default:
		console.log('\x1b[33m%s\x1b[0m', `You are running in ${process.env.NODE_ENV} mode`);
  	}
} else {
	console.log(`You must define the node environment in the .env file`);
  	process.exit();
}

if(!process.env.TRANSPORT_API_KEY){ 
  	console.error(`\x1b[31m%s\x1b[0m`, `You have not defined your Transport API Key`); 
  	process.exit();
}

if(!process.env.TRANSPORT_API_APPID){
  	console.error(`\x1b[31m%s\x1b[0m`, `You have not defined your Transport API App ID`); 
  	process.exit();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Set route handlers
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
