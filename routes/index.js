const fs= require('fs');
var express = require('express');
var router = express.Router();
var forecastData;

/* GET home page. */
router.get('/', function(req, res, next) {

  async function getData() {
    const url = "https://api.weather.gov/points/39.7456,-97.0892";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json.properties.forecast;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getForecast(forecastUrl) {
    try {
      const response = await fetch(forecastUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      let forecastString = "";
      for (let i = 0; i < json.properties.periods.length; i++) {
        forecastString += `${json.properties.periods[i].name} ${json.properties.periods[i].startTime} ${json.properties.periods[i].temperature} ${json.properties.periods[i].shortForecast}`;
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
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

  // getData().then((forecastUrl) => {
  //   getForecast(forecastUrl).then((json) => {
  //     forecastData = json;
  //   });
  // });

  getData().then((forecastUrl) => {
    return getForecast(forecastUrl)
  }).then((json) => {
    return (forecastData = json);
  }).then((forecastData) => {
    console.log("data = " + forecastData);
    res.render('index', { title: forecastData.properties.periods[0].name });
  });

});

module.exports = router;
