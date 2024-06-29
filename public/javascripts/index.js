/*const fs= require('fs');

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
        let forecastString = (`${json.properties.periods[0].name} ${json.properties.periods[0].startTime} ${json.properties.periods[0].temperature} ${json.properties.periods[0].shortForecast}`);

        return json;
    } catch (error) {
        console.error(error.message);
    }
}

getData().then((forecastUrl) => {
    getForecast(forecastUrl);
});
//     document.querySelector("#test-class").innerText = `${forecastUrl.name} ${forecastUrl.startTime} ${forecastUrl.temperature} ${forecastUrl.shortForecast}`;
// });
*/
