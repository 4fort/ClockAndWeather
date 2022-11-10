// Time
let hr = document.querySelector('#hr');
let mn = document.querySelector('#mn');
let sc = document.querySelector('#sc');

// Date
const days = document.querySelector('.day');
const months = document.querySelector('.month');

function formatMonth(date) {
    let MONTHS = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
function formatDay(date) {
    let DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return `${DAYS[date.getDay()]}`;
}

setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * 6;
    let ss = day.getSeconds() * 6;

    hr.style.transform = `rotateZ(${hh+((mm+(ss/60))/12)}deg)`;
    mn.style.transform = `rotateZ(${mm+(ss/60)}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;


    // digital clock
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    // let seconds = document.getElementById('seconds');
    let ampm = document.getElementById('ampm');

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    let am = h >= 12 ? "PM" : "AM";

    // Change bg according to PM or AM
    let bg = document.querySelector('body');

    if(am == "PM") {
        bg.style.backgroundImage = "url('bgNight.jpg')";
    }
    else{
        bg.style.backgroundImage = "url('bgDay.jpg')";
    }
    
    // Change icon according to PM or AM
    let dnIcon = document.querySelector('#dnIcon');

    (am == "PM") ? dnIcon.classList.add('bi-moon') : dnIcon.classList.add('bi-sun'); ; 

    // 12hr format
    if (h > 12){
        h = h - 12;
    }
    // 12 instead of 00 if 12AM
    if (h === 00){
        h = 12;
    }

    // add zero before single digit number
    h = (h < 10) ? "" +  h : h;
    m = (m < 10) ? "0" +  m : m;
    s = (s < 10) ? "0" +  s : s;

    hours.innerHTML = h;
    minutes.innerHTML = m;
    // seconds.innerHTML = s;
    ampm.innerHTML = am;


    // Date
    let date = new Date();

    days.innerHTML = formatDay(date);
    months.innerHTML = formatMonth(date);

    // Alarm
    if(m == 57){
        console.log('it worked!' + s)
    }

    if(s == 60){
        getWeather();
    }

},1000)


// Weather
// api 610a95f5a7c903124a7c9476bcc0a881

const weatherIcon = document.querySelector('.weatherIcon');
const weatherTemp = document.querySelector('.weatherTempUnit');
const weatherDesc = document.querySelector('.weatherTempDesc');
const weatherLocation = document.querySelector('.weatherLocation');
const weatherNotif = document.querySelector('.weatherNotification');

const weather = {};
weather.temperature = {
    unit: 'celsius'
};

const weatherKey = '610a95f5a7c903124a7c9476bcc0a881';

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    weatherNotif.style.display = 'block';
    weatherNotif.innerHTML = `<p> Browser doesn't support Geolocalization`;
}

var latitude;
var longitude;
function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getWeather();
}

// weather error handling

function showError(error) {
    weatherNotif.style.display = 'block';
    weatherNotif.innerHTML = `<p> ${error.message}`
}

// weather display
var KELVIN = 273;

let tempUnitToggle_btn = document.getElementById('btnWeatherUnit');

setTimeout(() => {
    getWeather();
},60000)
function getWeather() {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`;
    console.log(api);
    
    fetch(api)
    .then((response) => {
        let data = response.json();
        return data;
    })
    .then((data) => {
        weather.temperature.valueC = Math.round(data.main.temp - KELVIN);
        weather.temperature.valueF = Math.round((data.main.temp - KELVIN) * 1.8 + 32);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(() => {
        displayWeather();
    });
}

function displayWeather() {
    tempUnitToggle_btn.parentElement.style.pointerEvents = 'all';

    if (tempUnitToggle_btn.checked) {
        weatherTemp.innerHTML = ` ${weather.temperature.valueF.toLocaleString(undefined, {style: 'unit', unit: 'fahrenheit'})}`;
    }
    else {
        weatherTemp.innerHTML = `${weather.temperature.valueC.toLocaleString(undefined, {style: 'unit', unit: 'celsius'})}`;
    }

    // weatherTemp.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    weatherIcon.innerHTML = `<img src="http://www.gstatic.com/images/icons/material/apps/weather/2x/${weatherIconUpdater()}_dark_color_96dp.png">`;
    weatherDesc.innerHTML = weather.description;
    weatherLocation.innerHTML = `${weather.city}, ${weather.country}`;

}
const weatherIconUpdater = () => {
    let weatherIconPath;
    switch (weather.iconId) {

        case '01d':
            return weatherIconPath = 'sunny';
            break;
        case '01n':
            return weatherIconPath = 'clear_night'
            break;

        case '02d':
            return weatherIconPath = 'mostly_sunny';
            break;
        case '02n':
            return weatherIconPath = 'mostly_clear_night';
            break;

        case '03d':
            return weatherIconPath = 'partly_cloudy';
            break;
        case '03n':
            return weatherIconPath = 'partly_cloudy_night';
            break;

        case '04d':
            return weatherIconPath = 'mostly_cloudy_day';
            break;
        case '04n':
            return weatherIconPath = 'mostly_cloudy_night';
            break;

        case '09d', '09n':
            return weatherIconPath = 'heavy_rain';
            break;

        case '10d':
            return weatherIconPath = 'scattered_showers_day';
            break;
        case '10n':
            return weatherIconPath = 'scattered_showers_night';
            break;

        case '11d':
            return weatherIconPath = 'strong_tstorms';
            break;
        case '11n':
            return weatherIconPath = 'isolated_scattered_tstorms_day';
            break;

        case '13d', '13n':
            return weatherIconPath = 'snow_showers_snow';
            break;

        case '50d', '50n':
            return weatherIconPath = 'haze_fog_dust_smoke';
            break;

        case 'undefined':
            return weatherIconPath = 'cloudy';
            break;
    }
}
