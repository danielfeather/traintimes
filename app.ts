import { TransportApi } from './config';
import {Application, NextFunction, Request, Response} from "express";
import * as express from 'express'
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from "body-parser";
import ldbws from './src/services/OpenLDBWS';

const expressSanitizer = require('express-sanitizer');
const helmet = require('helmet')

import index from './routes/index';
import station from './routes/station';
import tocs from './src/services/KB/tocs';
import {GetStationBoardResult, Service} from "./src/types/OpenLDBWS";

const app = express();

if(process.env.NODE_ENV){
  	switch(process.env.NODE_ENV){
		case 'production':
			console.log('\x1b[32m%s\x1b[0m', `You are running in production mode`);
			break;
		default:
			console.log('\x1b[33m%s\x1b[0m', `You are running in ${process.env.NODE_ENV} mode`);
			break;
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
app.use('/tocs', tocs)
app.get('/ldbws/:crs', async function (req: express.Request, res: express.Response){
	const departures = new ldbws()
	await departures.init()
	const rawResponse: GetStationBoardResult = await departures.getDepBoardWithDetails(req.params.crs)
	res.json(rawResponse)
})

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
