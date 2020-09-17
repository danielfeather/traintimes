import express from 'express';
import {
  Router,
  Request,
  Response
} from "express";

import * as request from "request";

const router: Router = Router();

import { TransportApi } from "../config";

/* GET home page. */
router.get('/', (req: Request, res: Response, next) => {

  request(`https://transportapi.com/v3/uk/train/station/LAN/live.json?app_key=${TransportApi.key}&app_id=${TransportApi.appid}`, function (error: object, response: request.Response, body: string) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body)
      // do more stuff
      res.render('index', { 
        title: `Traintimes`,
        station_name: info.station_name,
        departures: info 
      });
    }
  });
  
});

export default router
