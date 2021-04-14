'use strict'
const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if(place == null) return

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            latitude,
            longitude
        })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, place.formatted_address)
    })

})

const locationElement = document.querySelector('[data-location]');
const statusElement = document.querySelector('[data-status]');
const temperatureElement = document.querySelector('[data-temperature]');
const feelsElement = document.querySelector('[data-feels]');
const windElement = document.querySelector('[data-wind]');
const iconElement = document.querySelector('.icon');

function setWeatherData(data, place) {

    const icon = data.weather[0].icon;
    iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    locationElement.textContent = place;
    statusElement.textContent = data.weather[0].description;
    feelsElement.textContent = data.main.feels_like;
    temperatureElement.textContent = data.main.temp;
    windElement.textContent = data.wind.speed;
    var cityName = data.name;
    document.body.style.backgroundImage = `url(https://source.unsplash.com/2560x1440/?${cityName})`
}