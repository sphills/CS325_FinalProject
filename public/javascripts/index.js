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
        console.log(JSON.stringify(data) === '{}');
        const targetElement = document.querySelector('.forecast-display');
        if (targetElement.hasChildNodes()) {
            targetElement.replaceChildren();
        }
        if (JSON.stringify(data) !== '{}') {
            let location = document.createElement('h2');
            location.className = 'forecast-location';
            location.innerText = (data.data.location.properties.city + ", " + data.data.location.properties.state);
            targetElement.appendChild(location);

            let forecastChart = document.createElement('article');
            forecastChart.className = 'forecast-chart';

            let forecastChartTitle = document.createElement('h2');
            forecastChartTitle.className = 'forecast-chart-title';
            forecastChartTitle.innerText = "Detailed Forecast";
            forecastChart.appendChild(forecastChartTitle);

            let sevenDayForecast = document.createElement('ul');
            sevenDayForecast.className = 'forecast-list';
            forecastChart.appendChild(sevenDayForecast);

            data.data.properties.periods.forEach((element) => {
                let forecastPeriod = document.createElement('li');
                forecastPeriod.className = 'forecast-summary';

                let forecastTime = document.createElement('h3');
                forecastTime.className = 'forecast-name';
                forecastTime.innerText = element.name;

                let forecastDetailedDescription = document.createElement('p');
                forecastDetailedDescription.className = 'forecast-description';
                forecastDetailedDescription.innerText = element.detailedForecast;

                forecastPeriod.appendChild(forecastTime);
                forecastPeriod.appendChild(forecastDetailedDescription);

                sevenDayForecast.appendChild(forecastPeriod);
            });

            targetElement.appendChild(forecastChart);
        } else {
            let errorMessage = document.createElement('h1');
            errorMessage.innerText = "No such location was found. Please check your lat-long and ensure the location is within the United States.";
            targetElement.appendChild(errorMessage);
        }
    });
});