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

})


// Weather
// api 610a95f5a7c903124a7c9476bcc0a881

const weatherIcon = document.querySelector('.weatherIcon');
const weatherTemp = document.querySelector('.weatherTempValue');
const weatherDesc = document.querySelector('.weatherTempDesc');
const weatherLocation = document.querySelector('.weatherLocation');
const weatherNotif = document.querySelector('.weatherNotification');

const weather = {};
weather.temperature = {
    unit: 'celsius'
};

const KELVIN = 273;

const weatherKey = '610a95f5a7c903124a7c9476bcc0a881';

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    weatherNotif.style.display = 'block';
    weatherNotif.innerHTML = `<p> Browser doesn't support Geolocalization`;
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// weather error handling

function showError(error) {
    weatherNotif.style.display = 'block';
    weatherNotif.innerHTML = `<p> ${error.message}`
}

// weather display

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`;
    console.log(api);
    
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.round(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

function displayWeather() {
    let button = document.getElementById('btnWeatherUnit');

    if (button.checked == true) {
        weather.temperature.value = Math.round((weather.temperature.value - 32) / 1.8);
        weatherIcon.innerHTML = `<img src="weatherIcons/${weather.iconId}.png"> ${weather.temperature.value.toLocaleString(undefined, {style: 'unit', unit: 'celsius'})}`;
    }
    else {
        weather.temperature.value = Math.round((weather.temperature.value * 1.8) + 32);
        weatherIcon.innerHTML = `<img src="weatherIcons/${weather.iconId}.png"> ${weather.temperature.value.toLocaleString(undefined, {style: 'unit', unit: 'fahrenheit'})}`;
    }

    // weatherTemp.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    weatherDesc.innerHTML = weather.description;
    weatherLocation.innerHTML = `${weather.city}, ${weather.country}`;

    // Buttons
    

}

console.log((weather.temperature.value * 1.8) + 32);