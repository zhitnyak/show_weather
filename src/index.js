import './sass/main.scss';
import axios from 'axios';
import Handlebars from 'handlebars/runtime';
Handlebars.registerHelper('tempC', function (value) {
  //   console.log(value);
  return (value - 273.15).toFixed(1);
  //   return new Handlebars.SafeString(Math.round(value - 273.15));
});
import weatherTpl from './templates/weatherWidget.hbs';

// conssole.log(Handlebars.helpers.tempCel(300));

const weatherContainer = document.getElementById('widget');
const searchForm = document.querySelector('.search');
const showWidgetBtn = document.getElementById('showWidget');
const card = document.querySelector('.card');

showWidgetBtn.addEventListener('click', () => {
  card.classList.toggle('isHide');
});
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  let city = e.target.elements.searchBar.value;
  //   console.log(city);
  let url = baseUrl + `?q=${city}&appid=${apiKey}`;
  if (!city.trim()) alert(`Enter the City`);
  axios
    .get(url)
    .then(result => {
      // console.log(result);
      return result.data;
    })
    .then(data => {
      //   console.log(data);
      let markupWeather = weatherTpl(data);
      // console.log(m);
      weatherContainer.classList.remove('loading');
      weatherContainer.innerHTML = markupWeather;
    })
    .catch(error => console.log(error));

  searchForm.reset();
});
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = `9d721911b4c91b575c9082973ab37921`;

//563492ad6f91700001000001658e3c044e0f4b59b3b517c11338d772
// BASE_URL = `https://api.pexels.com/v1/`;
