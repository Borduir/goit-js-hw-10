import { countryList, coutryData } from '../index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name, newResponse, marckup) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notify.failure('Oops, there is no country with that name');
      coutryData.innerHTML = '';
      countryList.innerHTML = '';
    }
    newResponse = response.json();
    return newResponse;
  });
}
