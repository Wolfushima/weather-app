import getWeatherInfo from './api-functions';

const form = {
    selector: document.querySelector('#hero-form'),
    input: document.querySelector('.form__search'),
    errorMsg: document.querySelector('.error-msg'),
    init: () => {
        form.selector.addEventListener('submit', form.search);
    },
    search: (e) => {
        e.preventDefault();
        if (form.errorMsg.style.display === 'block') {
            form.errorMsg.style.display = 'none';
        }
        getWeatherInfo(form.input.value, 'imperial');
        form.selector.reset();
    },
};

export default form;
