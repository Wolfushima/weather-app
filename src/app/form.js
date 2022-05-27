import getWeatherInfo from './api-functions';

const form = {
    selector: document.querySelector('#hero-form'),
    input: document.querySelector('.form__search'),
    init: () => {
        form.selector.addEventListener('submit', form.search);
    },
    search: (e) => {
        e.preventDefault();
        getWeatherInfo(form.input.value);
        form.selector.reset();
    },
};

export default form;
