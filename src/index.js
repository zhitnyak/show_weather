import './sass/main.scss';
import axios from 'axios';
import Handlebars from 'handlebars/runtime';
import weatherTpl from './templates/weatherWidget.hbs';

const weatherContainer = document.getElementById('widget');
const searchForm = document.querySelector('.search');
const showWidgetBtn = document.getElementById('showWidget');
const card = document.querySelector('.card');

const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = `9d721911b4c91b575c9082973ab37921`;

showWidgetBtn.addEventListener('click', () => {
  card.classList.toggle('isHide');
});
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  let city = e.target.elements.searchBar.value;
  //   console.log(city);
  let url = baseUrl + `?q=${city}&appid=${apiKey}&units=metric`;
  if (!city.trim()) alert(`Enter the City`);
  axios
    .get(url)
    .then(result => {
      // console.log(result);
      return result.data;
    })
    .then(data => {
      console.log(data);
      data.main.temp = Math.round(data.main.temp);
      let markupWeather = weatherTpl(data);
      weatherContainer.classList.remove('loading');
      weatherContainer.innerHTML = markupWeather;
    })
    .catch(error => console.log(error));

  searchForm.reset();
});
