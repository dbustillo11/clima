const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const cityInput = document.querySelector('#city');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (cityInput.value === '') {
        showError('El campo de la ciudad es obligatorio...');
        return;
    }

    callAPI(cityInput.value);
})

function callAPI(city){
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

// Rest of your functions (showWeather, showError, kelvinToCentigrade, clearHTML) remain the same.




function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);

    /* console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon); */
}

function showError(message){
    //console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
