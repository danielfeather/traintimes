const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

/* GET home page. */
router.get('/:station_code',function(req, res, next) {
  stationCode = req.sanitize(req.params.station_code);
  if(stationCode === "" || stationCode === " "){
    stationCode = "LAN";
  }
  request(`https://transportapi.com/v3/uk/train/station/${stationCode}/live.json?app_key=${config.transportApi.key}&app_id=${config.transportApi.appid}`, function (error, response, body) {
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

module.exports = router;
