import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import * as request from "request";
import { TransportApi } from "../config";

/* GET home page. */
router.get('/:station_code',function(req: Request, res: Response) {
  let stationCode = req.params.station_code;
  if(stationCode === "" || stationCode === " "){
    stationCode = "LAN";
  }
  request(`https://transportapi.com/v3/uk/train/station/${stationCode}/live.json?app_key=${TransportApi.key}&app_id=${TransportApi.appid}`, function (error, response: request.Response, body: string) {
    const info = JSON.parse(body);
    if (!error && !info.error && response.statusCode == 200) {
      res.render('index', { 
          title: `Traintimes`,
          station_name: info.station_name,
          departures: info 
        });
    } else if(info.error) {
      res.render('station-error', { error: info.error });
    }
  });
  
});

export default router
