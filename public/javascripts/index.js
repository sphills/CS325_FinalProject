const form = document.querySelector('form');
const input = document.querySelector('.lat-long-input');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch('/forecast', {
        method: "POST",
        body: JSON.stringify({ inputValue: input.value }),
        headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.json())
    .then((data) => {
        const targetElement = document.querySelector('.forecast-display');
        if (targetElement.hasChildNodes()) {
            targetElement.replaceChildren();
        }
        let location = document.createElement('h2');
        location.innerText = (data.data.location.properties.city + ", " + data.data.location.properties.state);
        targetElement.appendChild(location);
        let sevenDayForecast = document.createElement('article');
        sevenDayForecast.className = 'forecast-chart';

        let forecastChartTitle = document.createElement('h2');
        forecastChartTitle.innerText = "Detailed Forecast";
        sevenDayForecast.appendChild(forecastChartTitle);

        data.data.properties.periods.forEach((element) => {
            let forecastPeriod = document.createElement('li');
            forecastPeriod.className = 'forecast-summary';

            let forecastTime = document.createElement('h3');
            forecastTime.className = 'forecast-name';
            forecastTime.innerText = element.name;

            let forecastShortDescription = document.createElement('p');
            forecastShortDescription.className = 'forecast-description';
            forecastShortDescription.innerText = element.shortForecast;

            forecastPeriod.appendChild(forecastTime);
            forecastPeriod.appendChild(forecastShortDescription);

            sevenDayForecast.appendChild(forecastPeriod);
        });

        targetElement.appendChild(sevenDayForecast);
    });
});