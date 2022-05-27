import weather from './weather';

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

export default async function getWeatherInfo(cityName, unit) {
    try {
        const weatherData = await getWeatherData(cityName, unit);
        const { name } = weatherData;
        const { description, icon } = weatherData.weather[0];
        const { temp, humidity } = weatherData.main;
        const { speed } = weatherData.wind;
        const { dt } = weatherData;
        const { country } = weatherData.sys;
        const date = new Date(dt * 1000);

        return weather.update(name, date, description, temp, humidity, speed, country, icon, unit);
    } catch (err) {
        return console.log(err);
    }
}
