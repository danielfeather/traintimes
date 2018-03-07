var express = require('express');
var router = express.Router();
var request = require('request');

const transportAPI_KEY = process.env.TRANSPORT_API_KEY;
const transportAPI_APPID = process.env.TRANSPORT_API_APPID;

/* GET home page. */
router.get('/:station_code',function(req, res, next) {
  stationCode = req.sanitize(req.params.station_code);
  if(stationCode === "" || stationCode === " "){
    stationCode = "LAN";
  }
  request(`https://transportapi.com/v3/uk/train/station/${stationCode}/live.json?app_key=${transportAPI_KEY}&app_id=${transportAPI_APPID}`, function (error, response, body) {
    var info = JSON.parse(body);
    if (!error && !info.error && response.statusCode == 200) {
      console.log(info);
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
