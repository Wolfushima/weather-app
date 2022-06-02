// eslint-disable-next-line import/no-cycle
import getWeatherInfo from './api-functions';
import icons from './utils/icons';

const weather = {
    name: document.querySelector('.weather__location'),
    date: document.querySelector('.weather__date'),
    description: document.querySelector('.weather__description'),
    temp: document.querySelector('.weather__temperature'),
    humidity: document.querySelector('.weather__humidity'),
    wind: document.querySelector('.weather__wind'),
    imperial: document.querySelector('.weather__imperial'),
    metric: document.querySelector('.weather__metric'),
    init: () => {
        getWeatherInfo('New York, US', 'imperial');
        weather.metric.addEventListener('click', weather.handleMetricUnit);
        weather.imperial.addEventListener('click', weather.handleImperialUnit);
    },
    update: (name, date, description, temp, humidity, speed, country, icon, unit) => {
        weather.name.textContent = `${name}, ${country}`;
        weather.date.textContent = date.toLocaleString('en-us', { weekday: 'long', hour: 'numeric', minute: 'numeric' });
        weather.description.textContent = description;
        weather.temp.firstChild.textContent = temp;
        weather.humidity.textContent = `Humidity: ${humidity}%`;
        if (unit === 'imperial') {
            weather.wind.textContent = `Wind: ${speed}mph`;
        } else if (unit === 'metric') {
            weather.wind.textContent = `Wind: ${speed}km/h`;
        }
        weather.handleIcon(icon);
    },
    handleIcon: (icon) => {
        const currentIcon = document.querySelector('.weather__icon');
        const newIcon = icons[icon].toString();
        const i = document.createElement('i');
        i.classList.add('weather__icon', 'bi', newIcon);
        currentIcon.replaceWith(i);
    },
    handleImperialUnit: () => {
        getWeatherInfo(weather.name.textContent, 'imperial');
        weather.imperial.classList.add('display-imperial');
        weather.metric.classList.remove('display-metric');
    },
    handleMetricUnit: () => {
        getWeatherInfo(weather.name.textContent, 'metric');
        weather.metric.classList.add('display-metric');
        weather.imperial.classList.remove('display-imperial');
        weather.metric.classList.add('display-metric');
    },
};

export default weather;
