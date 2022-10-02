import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('input');
export const countryList = document.querySelector('ul');
export const coutryData = document.querySelector('div');

countryInput.addEventListener(
  'input',
  debounce(function () {
    if (countryInput.value !== '') {
      fetchCountries(countryInput.value.trim());
    }
  }, DEBOUNCE_DELAY)
);
