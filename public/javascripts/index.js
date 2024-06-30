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
        data.data.properties.periods.forEach((element) => {
            console.log(element);
        })
    });
});