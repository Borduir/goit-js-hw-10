import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
let marckup = '';
let newResponse;

const countryInput = document.querySelector('input');
export const countryList = document.querySelector('.country-list');
export const coutryData = document.querySelector('.country-info');

countryInput.addEventListener(
  'input',
  debounce(function () {
    if (countryInput.value.trim() !== '') {
      fetchCountries(countryInput.value.trim(), newResponse, marckup)
        .then(newResponse => {
          if (newResponse.length > 10) {
            Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            coutryData.innerHTML = '';
            countryList.innerHTML = '';
          } else if (newResponse.length >= 2 && newResponse.length <= 10) {
            marckup = '';
            for (let i = 0; i < newResponse.length; i += 1) {
              marckup += `<li><p><img width="30px" height="15px" src="${newResponse[i].flags.svg}" alt ="${newResponse[i].name.official} flag" />${newResponse[i].name.official}</p></li>`;
            }
            countryList.innerHTML = marckup;
            coutryData.innerHTML = '';
          } else if (newResponse.length === 1) {
            marckup = `<h2><img width="60px" height="30px" src="${
              newResponse[0].flags.svg
            }" alt ="${newResponse[0].name.official} flag" /> ${
              newResponse[0].name.official
            }</h2><p><b>Capital: </b>${
              newResponse[0].capital
            }</p><p><b>Population: </b>${
              newResponse[0].population
            }</p><p><b>Languages: </b>${Object.values(
              newResponse[0].languages
            )}</p>`;
            coutryData.innerHTML = marckup;
            countryList.innerHTML = '';
            const title = document.querySelector('h2');
            title.style.color = 'orange';
            title.style.fontSize = '20px';
          }
        })
        .catch(console.error)
        .finally(() => {
          if (countryList !== '') {
            const text = document.querySelectorAll('p');
            for (const paragraph of text) {
              paragraph.style.color = 'tomato';
            }
          }
        });
    } else {
      coutryData.innerHTML = '';
      countryList.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);
