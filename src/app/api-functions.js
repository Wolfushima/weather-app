// eslint-disable-next-line import/no-cycle
import weather from './weather';
import forecast from './forecast';

async function getWeatherData(cityName, unit) {
    const apiKey = 'a24c2c29779f769bcd957c131159a94d';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`, { mode: 'cors' });
        const data = await response.json();
        return data;
    } catch (err) {
        return console.log(err);
    }
}

async function getForecastData(lat, lon, unit) {
    const apiKey = 'a24c2c29779f769bcd957c131159a94d';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts,hourly&units=${unit}&appid=${apiKey}`, { mode: 'cors' });
        const data = await response.json();
        return data;
    } catch (err) {
        return console.log(err);
    }
}

async function getForecastInfo(lat, lon, unit) {
    try {
        const data = await getForecastData(lat, lon, unit);
        const [, ...forecastData] = data.daily;
        const forecastInfo = forecastData.map((day) => ({
            dt: day.dt,
            min: day.temp.min,
            max: day.temp.max,
            icon: day.weather[0].icon,
        }));
        forecast.update(forecastInfo);
    } catch (err) {
        console.log(err);
    }
}

export default async function getWeatherInfo(cityName, unit) {
    try {
        const weatherData = await getWeatherData(cityName, unit);
        const { lat, lon } = weatherData.coord;
        const { name } = weatherData;
        const { description, icon } = weatherData.weather[0];
        const { temp, humidity } = weatherData.main;
        const { speed } = weatherData.wind;
        const { dt } = weatherData;
        const { country } = weatherData.sys;
        const date = new Date(dt * 1000);

        getForecastInfo(lat, lon, unit);
        weather.update(name, date, description, temp, humidity, speed, country, icon, unit);
        return;
    } catch (err) {
        console.log(err);
    }
}
