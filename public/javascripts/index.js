async function getData() {
    const url = "https://api.weather.gov/points/39.7456,-97.0892";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        // console.log(json.properties.forecast);
        return json.properties.forecast;
    } catch (error) {
        console.error(error.message);
    }
}

getData().then((forecastUrl) => {
    document.querySelector("#test-class").innerText = forecastUrl;
});