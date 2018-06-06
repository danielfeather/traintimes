const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

/* GET home page. */
router.get('/', (req, res, next) => {

  request(`https://transportapi.com/v3/uk/train/station/LAN/live.json?app_key=${config.transportApi.key}&app_id=${config.transportApi.appid}`, function (error, response, body) {
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
