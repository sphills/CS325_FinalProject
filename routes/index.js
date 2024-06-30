const fs= require('fs');
var express = require('express');
var router = express.Router();
var forecastData;

router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET forecast page. */
router.post('/forecast', function(req, res, next) {
  async function getData() {
    const url = `https://api.weather.gov/points/${req.body.inputValue}`;
    //const url = `https://api.weather.gov/points/39.7456,-97.0892`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return { forecast: json.properties.forecast, location: json.properties.relativeLocation };
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getForecast(forecastUrl) {
    try {
      const response = await fetch(forecastUrl.forecast);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      let forecastString = "";
      for (let i = 0; i < json.properties.periods.length; i++) {
        forecastString += `${json.properties.periods[i].name}, ${json.properties.periods[i].startTime}, ${json.properties.periods[i].temperature}, ${json.properties.periods[i].shortForecast}`;
        if (Number(i) != Number(json.properties.periods.length)) {
          forecastString += "\n";
        }
      }

      fs.writeFile('./test.txt', forecastString, err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });
      json.location = forecastUrl.location;
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

  getData().then((forecastUrl) => {
    return getForecast(forecastUrl);
  }).then((json) => {
    return (forecastData = json);
  }).then((forecastData) => {
    res.send({ data: forecastData });
  });

});

module.exports = router;
