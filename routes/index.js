const express = require('express');
const router = express.Router();
const request = require('request');

const transportAPI_KEY = process.env.TRANSPORT_API_KEY;
const transportAPI_APPID = process.env.TRANSPORT_API_APPID;

/* GET home page. */
router.get('/', function(req, res, next) {
  stationCode = 'LAN';
  request(`https://transportapi.com/v3/uk/train/station/${stationCode}/live.json?app_key=${transportAPI_KEY}&app_id=${transportAPI_APPID}`, function (error, response, body) {
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

module.exports = router;
