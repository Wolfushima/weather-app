import run from './app/app';
import './scss/style.scss';

async function getWeather() {
    try {
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=a24c2c29779f769bcd957c131159a94d', { mode: 'cors' });
        console.log(response);
        const weatherData = await response.json();
        console.log(weatherData);
    } catch (err) {
        console.log(err);
    }
}
getWeather();
run();
