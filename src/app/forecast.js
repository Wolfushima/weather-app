import icons from './utils/icons';

const forecast = {
    init: () => {
        console.log(forecast.dailyItem);
    },
    update: (forecastInfo) => {
        const dailyItems = document.querySelectorAll('.daily__item');

        for (let i = 0; i < forecastInfo.length; i += 1) {
            const dailyDay = dailyItems[i].querySelector('.daily__day');
            const dailyTempMax = dailyItems[i].querySelector('.daily__max-temperature');
            const dailyTempMin = dailyItems[i].querySelector('.daily__min-temperature');
            const dailyIcon = dailyItems[i].querySelector('.daily__icon');
            const newIcon = icons[forecastInfo[i].icon].toString();

            dailyDay.textContent = new Date(forecastInfo[i].dt * 1000).toLocaleString('en-us', { weekday: 'long' });
            dailyTempMax.textContent = `Max: ${forecastInfo[i].max}°`;
            dailyTempMin.textContent = `Min: ${forecastInfo[i].min}°`;

            forecast.handleIcon(dailyIcon, newIcon);
        }
    },
    handleIcon: (dailyIcon, newIcon) => {
        const i = document.createElement('i');
        i.classList.add('daily__icon', 'bi', newIcon);
        dailyIcon.replaceWith(i);
    },
};

export default forecast;
