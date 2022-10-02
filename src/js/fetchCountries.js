import { countryList, coutryData } from '../index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(response => {
      let marckup = '';
      if (response.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length >= 2 && response.length <= 10) {
        for (let i = 0; i < response.length; i += 1) {
          marckup += `<li><p><img width="30px" height="15px" src="${response[i].flags.svg}" alt ="${response[i].name.official} flag" />${response[i].name.official}</p></li>`;
          countryList.innerHTML = marckup;
          coutryData.innerHTML = '';
        }
      } else {
        marckup = `<h2><img width="60px" height="30px" src="${
          response[0].flags.svg
        }" alt ="${response[0].name.official} flag" /> ${
          response[0].name.official
        }</h2><p><b>Capital: </b>${
          response[0].capital
        }</p><p><b>Population: </b>${
          response[0].population
        }</p><p><b>Languages: </b>${Object.values(response[0].languages)}</p>`;
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
}
